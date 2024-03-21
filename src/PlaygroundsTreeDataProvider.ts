/*
  Copyright 2024 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import * as vscode from "vscode";
import {basename, extname, posix} from "path";
import {VariablesViewProvider} from "./VariablesViewProvider";
import {ScriptsTreeDataProvider} from "./ScriptsTreeDataProvider";
import {ReadOnlyContentProvider} from "./ReadOnlyContentProvider";

type IconPath = {
  light: string | vscode.Uri;
  dark: string | vscode.Uri;
};
export class SnapshotTreeItem extends vscode.TreeItem {
  iconPath: vscode.ThemeIcon | IconPath;
  uri: vscode.Uri;
  parent?: string;
  children: SnapshotTreeItem[] | undefined;
  id: string;

  constructor(label: string, id: string, uri: vscode.Uri, parent: string) {
    super(label, vscode.TreeItemCollapsibleState.None);

    this.iconPath = new vscode.ThemeIcon(
      "history",
      new vscode.ThemeColor("terminal.ansiGreen"),
    );
    this.uri = uri;
    this.parent = parent;
    this.id = id;
  }

  contextValue = "SnapshotTreeItem";
}

export class PlaygroundTreeItem extends vscode.TreeItem {
  // type: TreeItemType;
  iconPath: vscode.ThemeIcon | IconPath = {
    light: posix.join(
      __filename,
      "..",
      "..",
      "media",
      "jsonnetmapper_24px_bluey.svg",
    ),
    dark: posix.join(
      __filename,
      "..",
      "..",
      "media",
      "jsonnetmapper_24px_bluey.svg",
    ),
  };
  children: SnapshotTreeItem[] | undefined;
  uri: vscode.Uri;
  parent?: string;

  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    uri: vscode.Uri,
    parent: string,
    children?: SnapshotTreeItem[],
  ) {
    super(label, collapsibleState);

    this.children = children;

    this.uri = uri;
    this.parent = parent;
  }

  contextValue = "PlaygroundTreeItem";
}

export class PlaygroundsTreeDataProvider
  implements vscode.TreeDataProvider<PlaygroundTreeItem | SnapshotTreeItem>
{
  private textEncoder = new TextEncoder();
  private treeData: PlaygroundTreeItem[];

  constructor(
    private readonly playgroundsRootUri: vscode.Uri,
    private readonly diagnosticCollection: vscode.DiagnosticCollection,
    private readonly variablesProvider: VariablesViewProvider,
    private readonly scriptsProvider: ScriptsTreeDataProvider,
    private readonly readOnlyContentProvider: ReadOnlyContentProvider,

    private readonly serverUrl: string,
    private readonly outputChannel: vscode.OutputChannel,
  ) {
    console.log("constructor", playgroundsRootUri);

    this.treeData = [];
  }

  getParent(
    node: PlaygroundTreeItem | SnapshotTreeItem,
  ): vscode.ProviderResult<PlaygroundTreeItem> {
    if (node instanceof PlaygroundTreeItem) {
      return null;
    } else {
      return this.treeData.find(
        (item) => item.label.toString() === node.parent,
      );
    }
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    PlaygroundTreeItem | undefined | null | void
  > = new vscode.EventEmitter<PlaygroundTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    PlaygroundTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(
    node: PlaygroundTreeItem | SnapshotTreeItem,
  ): PlaygroundTreeItem | SnapshotTreeItem {
    // ): vscode.TreeItem | Thenable<vscode.TreeItem> {

    node.tooltip = "";
    if (!node.children) {
      node.collapsibleState = vscode.TreeItemCollapsibleState.None;
    }

    if (node instanceof SnapshotTreeItem) {
      const idLabel =
        new Date(parseInt(node.id)).toDateString() +
        " " +
        new Date(parseInt(node.id)).toLocaleTimeString();
      if (node.label !== idLabel) {
        node.tooltip = "Snapshot created at " + idLabel;
      }
    }

    return node;
  }

  getPlayground(
    playground: string,
    snapshot: string,
  ): PlaygroundTreeItem | SnapshotTreeItem {
    const playgroundTreeItem = this.treeData.find(
      (item) => item.label === playground,
    );

    if (snapshot) {
      // const idLabel =
      //   new Date(parseInt(snapshot)).toDateString() +
      //   " " +
      //   new Date(parseInt(snapshot)).toLocaleTimeString();

      return playgroundTreeItem.children.find(
        // (item) => item.label.toString() === idLabel,
        (item) => item.id === snapshot,
      );
    } else {
      return playgroundTreeItem;
    }
  }

  async getChildren(
    node?: PlaygroundTreeItem | undefined,
  ): Promise<PlaygroundTreeItem[] | SnapshotTreeItem[]> {
    console.log("getChildren", node);

    if (node === undefined) {
      this.treeData = [];

      if (this.playgroundsRootUri) {
        try {
          const playgroundDirEntries = (
            await vscode.workspace.fs.readDirectory(this.playgroundsRootUri)
          ).filter(
            ([name, type]) =>
              name !== ".DS_Store" && type === vscode.FileType.Directory,
          );

          for (const [name, _] of playgroundDirEntries) {
            const playgroundDirUri = this.playgroundsRootUri.with({
              path: posix.join(this.playgroundsRootUri.path, name),
            });

            const snapshotsDirUri = playgroundDirUri.with({
              path: posix.join(playgroundDirUri.path, "snapshots"),
            });

            const snapshotsDirEntries = (
              await vscode.workspace.fs.readDirectory(snapshotsDirUri)
            ).filter(
              ([name, type]) =>
                name !== ".DS_Store" && type === vscode.FileType.Directory,
            );
            const children: SnapshotTreeItem[] = [];

            for (const [snapshotDirName, _] of snapshotsDirEntries) {
              const snapshotDirUri = snapshotsDirUri.with({
                path: posix.join(snapshotsDirUri.path, snapshotDirName),
              });

              const snapshotMetaUri = snapshotDirUri.with({
                path: posix.join(snapshotDirUri.path, "meta.json"),
              });

              let label = "";

              try {
                const bytes = await vscode.workspace.fs.readFile(
                  snapshotMetaUri,
                );
                const snapshotMeta = JSON.parse(bytes.toString());
                label = snapshotMeta.label;
              } catch {
                label =
                  new Date(parseInt(snapshotDirName)).toDateString() +
                  " " +
                  new Date(parseInt(snapshotDirName)).toLocaleTimeString();
              }
              children.push(
                new SnapshotTreeItem(
                  label,
                  snapshotDirName,
                  snapshotDirUri,
                  name,
                ),
              );
            }
            children.reverse();

            this.treeData.push(
              new PlaygroundTreeItem(
                name,
                children.length
                  ? vscode.TreeItemCollapsibleState.Collapsed
                  : vscode.TreeItemCollapsibleState.None,
                playgroundDirUri,
                null,
                children,
              ),
            );
          }
        } catch (e) {
          console.log("Directory doesn't exist yet, so no playgrounds", e);
        }
      }
      return this.treeData;
    }
    return node.children;
  }

  async closeFileIfOpen(file: vscode.Uri): Promise<void> {
    const tabs: vscode.Tab[] = vscode.window.tabGroups.all
      .map((tg) => tg.tabs)
      .flat();
    const index = tabs.findIndex(
      (tab) =>
        tab.input instanceof vscode.TabInputText &&
        tab.input.uri.path.toLowerCase() === file.path.toLowerCase(),
    );
    if (index !== -1) {
      await vscode.window.tabGroups.close(tabs[index]);
    }
  }

  async closeScripts(scriptsDirUri: vscode.Uri) {
    const scriptsDirEntries = (
      await vscode.workspace.fs.readDirectory(scriptsDirUri)
    ).filter(
      ([name, type]) => name !== ".DS_Store" && type === vscode.FileType.File,
    );

    for (const [name, _] of scriptsDirEntries) {
      const scriptsUri = scriptsDirUri.with({
        path: posix.join(scriptsDirUri.path, name),
      });
      console.log("closing", scriptsUri.path);
      await this.closeFileIfOpen(scriptsUri);
    }
  }

  async closeSnapshotScripts(snapshotsDirUri: vscode.Uri) {
    const snapshotsDirEntries = (
      await vscode.workspace.fs.readDirectory(snapshotsDirUri)
    ).filter(
      ([name, type]) =>
        name !== ".DS_Store" && type === vscode.FileType.Directory,
    );

    for (const [name, _] of snapshotsDirEntries) {
      const scriptsDirUri = snapshotsDirUri.with({
        path: posix.join(snapshotsDirUri.path, name, "scripts"),
      });
      this.closeScripts(scriptsDirUri);
    }
  }

  public deletePlayground(node: PlaygroundTreeItem) {
    vscode.window
      .showInformationMessage(`Delete Playground ${node.label}?`, "Yes", "No")
      .then(async (answer) => {
        if (answer === "Yes") {
          // Run function
          try {
            console.log("deleting", node.uri);

            const scriptsDirUri = node.uri.with({
              path: posix.join(node.uri.path, "scripts"),
            });
            await this.closeScripts(scriptsDirUri);

            const snapshotsDirUri = node.uri.with({
              path: posix.join(node.uri.path, "snapshots"),
            });
            await this.closeSnapshotScripts(snapshotsDirUri);

            await vscode.workspace.fs.delete(node.uri, {
              recursive: true,
              useTrash: false,
            });
          } catch (e) {
            vscode.window.showErrorMessage("err", e);
          }
          this.refresh();
        }
      });
  }

  public async deleteSnapshot(node: SnapshotTreeItem): Promise<string> {
    const answer = await vscode.window.showInformationMessage(
      `Delete Snapshot ${node.label}?`,
      "Yes",
      "No",
    );

    if (answer === "Yes") {
      // Run function
      try {
        console.log("deleting", node.uri, node.parent);

        const scriptsDirUri = node.uri.with({
          path: posix.join(node.uri.path, "scripts"),
        });
        await this.closeScripts(scriptsDirUri);

        await vscode.workspace.fs.delete(node.uri, {
          recursive: true,
          useTrash: false,
        });
      } catch (e) {
        vscode.window.showErrorMessage("err", e);
      }
      this.refresh();
      return node.parent;
    }
    return "";
  }

  private createFiles = async (uri: vscode.Uri, json: any) => {
    const extVarsUri = uri.with({
      path: posix.join(uri.path, "extVars.json"),
    });
    await vscode.workspace.fs.writeFile(
      extVarsUri,
      this.textEncoder.encode(JSON.stringify(json.extVars || [], null, 2)),
    );

    const scriptsDirUri = uri.with({
      path: posix.join(uri.path, "scripts"),
    });

    try {
      await vscode.workspace.fs.createDirectory(scriptsDirUri);
    } catch (e) {
      vscode.window.showErrorMessage("unable to create directory");
    }

    if (json.scripts) {
      json.scripts.map(async (script: any) => {
        const scriptUri = scriptsDirUri.with({
          path: posix.join(scriptsDirUri.path, script.name),
        });

        await vscode.workspace.fs.writeFile(
          scriptUri,
          this.textEncoder.encode(script.snippet),
        );
      });
    } else {
      const scriptUri = scriptsDirUri.with({
        path: posix.join(scriptsDirUri.path, "default"),
      });
      await vscode.workspace.fs.writeFile(
        scriptUri,
        this.textEncoder.encode(json.snippet),
      );
    }
  };

  public async renameSnapshot(node: SnapshotTreeItem) {
    console.log("renameSnapshot", node.uri);

    const snapshotName = await vscode.window.showInputBox({
      placeHolder: "snapshot-name",
      title: "Snapshot Name (or blank to revert to auto name)\n",
    });

    if (snapshotName === undefined) {
      return;
    }

    const snapshotMetaUri = node.uri.with({
      path: posix.join(node.uri.path, "meta.json"),
    });

    let label = "";
    if (snapshotName !== "") {
      label = snapshotName;
    } else {
      label =
        new Date(parseInt(node.id)).toDateString() +
        " " +
        new Date(parseInt(node.id)).toLocaleTimeString();
    }

    const snapshotMeta = {label: label};
    await vscode.workspace.fs.writeFile(
      snapshotMetaUri,
      this.textEncoder.encode(JSON.stringify(snapshotMeta, null, 2)),
    );
    this.refresh();
  }

  public async takeSnapshot(node: PlaygroundTreeItem) {
    console.log("takeSnapshot", node.uri);

    const snapshotName = await vscode.window.showInputBox({
      placeHolder: "snapshot-name",
      title: "Snapshot Name (or blank for auto name)",
    });

    if (snapshotName === undefined) {
      return;
    }

    console.log("snapshotName", snapshotName);

    const snapshotId = Date.now().toString();

    const snapshotDirUri = node.uri.with({
      path: posix.join(node.uri.path, "snapshots", snapshotId),
    });

    try {
      await vscode.workspace.fs.createDirectory(snapshotDirUri);
    } catch (e) {
      vscode.window.showErrorMessage("unable to create directory");
    }

    try {
      const snapshotMetaUri = snapshotDirUri.with({
        path: posix.join(snapshotDirUri.path, "meta.json"),
      });

      const label =
        new Date(parseInt(snapshotId)).toDateString() +
        " " +
        new Date(parseInt(snapshotId)).toLocaleTimeString();

      const snapshotMeta = {label: snapshotName || label};
      await vscode.workspace.fs.writeFile(
        snapshotMetaUri,
        this.textEncoder.encode(JSON.stringify(snapshotMeta, null, 2)),
      );

      await vscode.workspace.fs.copy(
        node.uri.with({
          path: posix.join(node.uri.path, "extVars.json"),
        }),
        snapshotDirUri.with({
          path: posix.join(snapshotDirUri.path, "extVars.json"),
        }),
      );
      await vscode.workspace.fs.copy(
        node.uri.with({
          path: posix.join(node.uri.path, "scripts"),
        }),
        snapshotDirUri.with({
          path: posix.join(snapshotDirUri.path, "scripts"),
        }),
      );
    } catch (e) {
      vscode.window.showErrorMessage("unable to copy playground");
    }

    vscode.window.showInformationMessage("Playground snapshot created");
    this.refresh();
  }

  public async exportPlayground(node: PlaygroundTreeItem) {
    console.log("exportPlayground", node);

    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Select",
      canSelectFiles: false,
      canSelectFolders: true,
    };

    const folderUri = await vscode.window.showOpenDialog(options);
    if (!folderUri || !folderUri[0]) {
      vscode.window.showInformationMessage("No folder selected");
      return;
    }

    console.log("Selected folder", folderUri[0].path);

    const d = new Date();
    const localeDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    const fileName = `playground-${node.label}-${localeDate
      .toISOString()
      .substring(0, 10)}.json`;

    const getScripts = async (uri: vscode.Uri) => {
      const scripts = [];

      const scriptsDirUri = uri.with({path: posix.join(uri.path, "scripts")});

      const scriptsDirEntries = (
        await vscode.workspace.fs.readDirectory(scriptsDirUri)
      ).filter(
        ([name, type]) =>
          name !== ".DS_Store" &&
          type === vscode.FileType.File &&
          extname(name) !== ".test",
      );

      for (const [name, _] of scriptsDirEntries) {
        if (name !== "default") {
          continue;
        }
        const scriptUri = scriptsDirUri.with({
          path: posix.join(scriptsDirUri.path, name),
        });

        const bytes = await vscode.workspace.fs.readFile(scriptUri);
        const script = {
          name: name,
          snippet: bytes.toString(),
          errorMessage: "",
        };
        scripts.push(script);
      }

      for (const [name, _] of scriptsDirEntries) {
        if (name === "default") {
          continue;
        }
        const scriptUri = scriptsDirUri.with({
          path: posix.join(scriptsDirUri.path, name),
        });

        const bytes = await vscode.workspace.fs.readFile(scriptUri);
        const script = {
          name: name,
          snippet: bytes.toString(),
          errorMessage: "",
        };

        scripts.push(script);
      }
      return scripts;
    };

    const getExtVars = async (uri: vscode.Uri) => {
      const extVarsUri = uri.with({
        path: posix.join(uri.path, "extVars.json"),
      });

      const bytes = await vscode.workspace.fs.readFile(extVarsUri);
      return JSON.parse(bytes.toString() || "[]");
    };

    const getSnapshots = async (uri: vscode.Uri) => {
      const snapshots = [];

      const snapshotsDirUri = uri.with({
        path: posix.join(uri.path, "snapshots"),
      });

      const snapshotsDirEntries = (
        await vscode.workspace.fs.readDirectory(snapshotsDirUri)
      ).filter(
        ([name, type]) =>
          name !== ".DS_Store" && type === vscode.FileType.Directory,
      );

      for (const [name, _] of snapshotsDirEntries) {
        const snapshotDirUri = snapshotsDirUri.with({
          path: posix.join(snapshotsDirUri.path, name),
        });

        // check for metadata
        const snapshotMetaUri = snapshotDirUri.with({
          path: posix.join(snapshotDirUri.path, "meta.json"),
        });

        let label = "";

        try {
          const bytes = await vscode.workspace.fs.readFile(snapshotMetaUri);
          const snapshotMeta = JSON.parse(bytes.toString());
          label = snapshotMeta.label;
        } catch {
          label =
            new Date(parseInt(name)).toDateString() +
            " " +
            new Date(parseInt(name)).toLocaleTimeString();
        }

        const s = {
          id: parseInt(name),
          label: label,
          scripts: await getScripts(snapshotDirUri),
          extVars: await getExtVars(snapshotDirUri),
        };

        snapshots.push(s);
      }
      return snapshots;
    };

    const playgroundExport = {
      type: "playground-export",
      version: "1.0.0",
      fileName: fileName,
      name: node.label,
      createdAt: Date.now(),
      snapshots: await getSnapshots(node.uri),
      scripts: await getScripts(node.uri),
      extVars: await getExtVars(node.uri),
    };

    const fileUri = folderUri[0].with({
      path: posix.join(folderUri[0].path, fileName),
    });

    await vscode.workspace.fs.writeFile(
      fileUri,
      this.textEncoder.encode(JSON.stringify(playgroundExport, null, 2)),
    );

    const doc = await vscode.workspace.openTextDocument(fileUri);
    vscode.window.showTextDocument(doc, {preview: false});
    vscode.window.showInformationMessage("Playground exported");
  }

  public async importPlayground(): Promise<string> {
    console.log("importPlayground");

    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Open",
      filters: {
        "JSON files": ["json"],
      },
    };

    const fileUri = await vscode.window.showOpenDialog(options);
    if (fileUri && fileUri[0]) {
      console.log("Selected file", fileUri[0]);

      const bytes = await vscode.workspace.fs.readFile(fileUri[0]);
      const json = JSON.parse(bytes.toString());

      if (json.type !== "playground-export") {
        vscode.window.showErrorMessage(
          "Error: invalid file type, not a playground export",
        );
        return "";
      }

      const playgroundDirUri = this.playgroundsRootUri.with({
        path: posix.join(this.playgroundsRootUri.path, json.name),
      });

      try {
        await vscode.workspace.fs.createDirectory(playgroundDirUri);
      } catch (e) {
        vscode.window.showErrorMessage("unable to create directory");
      }

      await this.createFiles(playgroundDirUri, json);

      const snapshotsDirUri = playgroundDirUri.with({
        path: posix.join(playgroundDirUri.path, "snapshots"),
      });

      try {
        await vscode.workspace.fs.createDirectory(snapshotsDirUri);
      } catch (e) {
        vscode.window.showErrorMessage("unable to create directory");
      }

      json.snapshots.map(async (snapshot: any) => {
        const snapshotUri = snapshotsDirUri.with({
          path: posix.join(snapshotsDirUri.path, snapshot.id.toString()),
        });
        await this.createFiles(snapshotUri, snapshot);
      });

      this.refresh();
      return json.name;
    }
  }

  public async onSelect(
    node: PlaygroundTreeItem | SnapshotTreeItem,
  ): Promise<void> {
    console.log("onSelect1", node instanceof PlaygroundTreeItem);
    console.log("onSelect2", node instanceof SnapshotTreeItem);

    if (!node) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        false,
      );

      this.variablesProvider.set(null);
      this.scriptsProvider.set(null);
    } else if (node instanceof PlaygroundTreeItem) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        true,
      );

      this.variablesProvider.set(node.uri);
      await this.scriptsProvider.set(node.uri);
    } else if (node instanceof SnapshotTreeItem) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        true,
      );

      this.variablesProvider.set(node.uri);
      await this.scriptsProvider.set(node.uri);
    }
  }

  public async addPlayground(): Promise<string> {
    console.log("add playground");

    const playgroundName = await vscode.window.showInputBox({
      placeHolder: "playground-name",
      title: "Playground Name",
    });

    if (!playgroundName) {
      return "";
    }

    if (playgroundName === "") {
      vscode.window.showErrorMessage(
        "Invalid Playground Name - name cannot be empty",
      );
      return "";
    }

    if (this.treeData.find((v) => v.label === playgroundName)) {
      vscode.window.showErrorMessage(
        "Invalid Playground Name - playground with same name already exists",
      );
      return "";
    }

    try {
      await vscode.workspace.fs.stat(this.playgroundsRootUri);
      // vscode.window.showTextDocument(this.playgroundsRootUri, {
      //   viewColumn: vscode.ViewColumn.Beside,
      // });
    } catch {
      // vscode.window.showInformationMessage(
      //   `${this.playgroundsRootUri.toString(true)}  does *not* exist`,
      // );
      await vscode.workspace.fs.createDirectory(this.playgroundsRootUri);
    }

    const json = {
      name: playgroundName,
      extVars: [],
      scripts: [
        {
          name: "default",
          snippet:
            "\n// Import the additional functions library\nlocal f = import 'functions';\n\n{\n  id: f.getExecutionId(),\n}",
          errorMessage: "",
        },
      ],
    };

    const playgroundDirUri = this.playgroundsRootUri.with({
      path: posix.join(this.playgroundsRootUri.path, json.name),
    });

    this.createFiles(playgroundDirUri, json);

    const snapshotsDirUri = playgroundDirUri.with({
      path: posix.join(playgroundDirUri.path, "snapshots"),
    });

    try {
      await vscode.workspace.fs.createDirectory(snapshotsDirUri);
    } catch (e) {
      vscode.window.showErrorMessage("unable to create directory");
    }

    vscode.window.showInformationMessage(`Playground ${playgroundName} added`);
    this.refresh();
    return playgroundName;
  }

  public async exec() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage(
        "Can't run Data Transformer script because there is no active window",
      );
      return;
    }

    console.log("exec", editor);
    if (
      editor?.document.uri.path
        .toLowerCase()
        .startsWith(this.playgroundsRootUri.path.toLowerCase())
    ) {
      vscode.languages.setTextDocumentLanguage(
        editor.document,
        "datatransformer",
      );

      const playgroundSplits = editor?.document.uri.path
        .substring(this.playgroundsRootUri.path.length + 1)
        .split("/");

      console.log(
        playgroundSplits,
        playgroundSplits.length,
        playgroundSplits[0],
        playgroundSplits[2],
      );

      let playgroundTreeItem: PlaygroundTreeItem;

      if (playgroundSplits.length > 3) {
        playgroundTreeItem = this.getPlayground(
          playgroundSplits[0],
          playgroundSplits[2],
        );
      } else {
        playgroundTreeItem = this.getPlayground(playgroundSplits[0], null);
      }

      const extVarsUri = playgroundTreeItem.uri.with({
        path: posix.join(playgroundTreeItem.uri.path, "extVars.json"),
      });

      const bytes = await vscode.workspace.fs.readFile(extVarsUri);
      const extVars = JSON.parse(bytes.toString());

      const title = `Data Transformer Output for ${basename(
        editor.document.fileName,
      )}`;

      const body = {
        script: basename(editor.document.fileName),
        snippet: editor.document.getText(),
        extVars: extVars,
      };

      try {
        this.diagnosticCollection.clear();

        const res = await fetch(`${this.serverUrl}/exec`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {"Content-Type": "application/json"},
        });

        const data: any = await res.json();

        if (data.status !== 200) {
          //diagnostics

          const errorMessage = data.message.substring(
            basename(editor.document.fileName).length + 1,
          );

          console.log(errorMessage);

          const location = errorMessage.substring(0, errorMessage.indexOf(" "));

          const line = parseInt(location.split(":")[0]);
          const charRange = location.split(":")[1];

          console.log(line, charRange);
          let startPos = 0;
          let endPos = 0;

          if (charRange.includes("-")) {
            startPos = parseInt(charRange.split("-")[0]);
            endPos = parseInt(charRange.split("-")[1]);
          } else {
            startPos = parseInt(charRange);
            endPos = startPos;
          }

          const diag = new vscode.Diagnostic(
            new vscode.Range(
              new vscode.Position(line - 1, startPos - 1),
              new vscode.Position(line - 1, endPos - 1),
            ),
            errorMessage.substring(errorMessage.indexOf(" ") + 1),
            vscode.DiagnosticSeverity.Error,
          );

          this.diagnosticCollection.set(editor.document.uri, [diag]);
        }

        if (data.trace) {
          this.outputChannel.show(true);
          this.outputChannel.appendLine(new Date().toISOString() + " " + title);
          this.outputChannel.appendLine(
            data.trace.replaceAll("TRACE: :", "trace:"),
          );
        }

        const uri = vscode.Uri.parse("readonly:").with({path: title});

        console.log(uri);

        // this.myProvider.setContentAndRefresh(uri, data.message);

        const doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider

        if (data.status === 200) {
          this.readOnlyContentProvider.setContentAndRefresh(
            uri,
            // JSON.stringify(JSON.parse(data.message), null, "\t") + "\n",
            JSON.stringify(JSON.parse(data.message), null, 2) + "\n",
          );
          vscode.languages.setTextDocumentLanguage(doc, "json");
        } else {
          this.readOnlyContentProvider.setContentAndRefresh(uri, data.message);
          vscode.languages.setTextDocumentLanguage(doc, "plaintext");
        }

        const testCaseUri = editor.document.uri.with({
          path: editor.document.uri.path + ".test",
        });

        try {
          await vscode.workspace.fs.stat(testCaseUri);

          vscode.commands.executeCommand(
            "vscode.diff",
            testCaseUri,
            uri,

            `Data Transformer Output for ${basename(editor.document.fileName)}`,
            {viewColumn: vscode.ViewColumn.Two, preview: true},
          );
        } catch {
          await vscode.window.showTextDocument(
            doc,
            vscode.ViewColumn.Two,
            true,
          );
        }

        // this.myProvider.onDidChangeEmitter.fire(uri);

        //         if (!this.panel) {
        //           this.panel = vscode.window.createWebviewPanel(
        //             "datatransformerOutput",
        //             title,
        //             {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true},
        //             {},
        //           );
        //           this.panel.onDidDispose(() => {
        //             this.panel = null;
        //           });
        //         } else {
        //           this.panel.title = title;
        //         }

        //         const html = `<html>
        // <head>
        // </head>
        // <body>
        // <pre>
        // <code style="background-color: transparent;font-size: 12px;">${data.message}</code>
        // </pre>
        // </body>
        // </html>`;

        //         this.panel.webview.html = html;
      } catch (e: any) {
        // vscode.window.showInformationMessage(
        vscode.window.showErrorMessage(
          `Error calling Jsonnet Server: ${e.message} ${e.cause}`,
        );

        // const uri = vscode.Uri.parse("readonly:" + title);
        const uri = vscode.Uri.parse("readonly:").with({path: title});

        // this.myProvider.setContentAndRefresh(uri, data.message);

        const doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider

        this.readOnlyContentProvider.setContentAndRefresh(
          uri,
          `${e.message} ${e.cause}`,
        );

        vscode.languages.setTextDocumentLanguage(doc, "plaintext");

        await vscode.window.showTextDocument(doc, vscode.ViewColumn.Two, true);
      }
    } else {
      vscode.window.showWarningMessage(
        "Script is not part of an open playground",
      );
    }
  }
}
