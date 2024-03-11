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
import {basename, posix} from "path";
import {VariablesViewProvider} from "./VariablesViewProvider";
import {ScriptsTreeDataProvider} from "./ScriptsTreeDataProvider";

enum TreeItemType {
  Playground = 1,
  Snapshot,
}
export class PlaygroundTreeItem extends vscode.TreeItem {
  type: TreeItemType;
  iconPath: vscode.ThemeIcon;
  children: PlaygroundTreeItem[] | undefined;
  uri: vscode.Uri;
  parent?: string;

  constructor(
    label: string,
    // collapsibleState: vscode.TreeItemCollapsibleState = vscode
    //   .TreeItemCollapsibleState.None,
    collapsibleState: vscode.TreeItemCollapsibleState,
    type: TreeItemType,
    uri: vscode.Uri,
    parent: string,
    children?: PlaygroundTreeItem[],
  ) {
    // super(
    //   label,
    //   children === undefined
    //     ? vscode.TreeItemCollapsibleState.None
    //     : vscode.TreeItemCollapsibleState.Collapsed,
    // );

    super(label, collapsibleState);

    this.children = children;
    this.iconPath =
      type === TreeItemType.Playground
        ? new vscode.ThemeIcon("server-process")
        : new vscode.ThemeIcon("history");
    this.type = type;
    this.uri = uri;
    this.parent = parent;
  }

  contextValue =
    this.collapsibleState === vscode.TreeItemCollapsibleState.Collapsed
      ? "PlaygroundTreeitem"
      : "PlaygroundTreeitem_Snapshot";

  public async onClick(): Promise<void> {
    // if (this.url) {
    //   await vscode.env.openExternal(vscode.Uri.parse(this.url));
    // }
  }
}

export class PlaygroundsTreeDataProvider
  implements vscode.TreeDataProvider<PlaygroundTreeItem>
{
  private panel: vscode.WebviewPanel | null = null;
  private textEncoder = new TextEncoder();
  private data: PlaygroundTreeItem[];

  constructor(
    private readonly storageUri: vscode.Uri,
    private readonly diagnosticCollection: vscode.DiagnosticCollection,
    private readonly variablesProvider: VariablesViewProvider,
    private readonly scriptsProvider: ScriptsTreeDataProvider,
    private readonly serverUri: string,
    private readonly outputChannel: vscode.OutputChannel,
  ) {
    console.log("constructor", storageUri);
    // this.storageUri = storageUri;
    // this.variablesProvider = variablesProvider;
    // this.scriptsProvider = scriptsProvider;

    this.data = [];
  }

  getParent(
    element: PlaygroundTreeItem,
  ): vscode.ProviderResult<PlaygroundTreeItem> {
    console.log("getParent", element);
    if (element.type === TreeItemType.Playground) {
      return null;
    } else {
      return this.data.find((item) => item.label.toString() === element.parent);
    }
  }
  // resolveTreeItem?(item: vscode.TreeItem, element: PlaygroundTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
  //   throw new Error("Method not implemented.");
  // }

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
    element: PlaygroundTreeItem,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    console.log("getTreeItem", element);

    if (!element.children) {
      element.collapsibleState = vscode.TreeItemCollapsibleState.None;
    }
    return element;
  }

  getPlayground(playground: string, snapshot: string): PlaygroundTreeItem {
    const playgroundTreeItem = this.data.find(
      (item) => item.label === playground,
    );

    if (snapshot) {
      const idLabel =
        new Date(parseInt(snapshot)).toDateString() +
        " " +
        new Date(parseInt(snapshot)).toLocaleTimeString();

      return playgroundTreeItem.children.find(
        (item) => item.label.toString() === idLabel,
      );
    } else {
      return playgroundTreeItem;
    }
  }

  // getParent(element: PlaygroundTreeItem): vscode.ProviderResult<PlaygroundTreeItem>
  // {
  //     if (element.label == 'cars') return undefined;
  //     return this.data[0];
  // }

  async getChildren(
    element?: PlaygroundTreeItem | undefined,
  ): Promise<PlaygroundTreeItem[]> {
    console.log("getChildren", element);

    if (element === undefined) {
      this.data = [];

      if (this.storageUri) {
        try {
          for (const [name, type] of await vscode.workspace.fs.readDirectory(
            this.storageUri,
          )) {
            // vscode.window.showInformationMessage(
            //   `getChildren ${name}, ${type}`,
            // );
            console.log("readDirectory", name, type);

            if (type !== vscode.FileType.Directory) {
              continue;
            }

            const playgroundDirUri = this.storageUri.with({
              path: posix.join(this.storageUri.path, name),
            });

            const playgroundMetaUri = this.storageUri.with({
              path: posix.join(this.storageUri.path, name, "playground.json"),
            });

            const snapshotsDirUri = playgroundDirUri.with({
              path: posix.join(playgroundDirUri.path, "snapshots"),
            });

            const scriptDirEntries = await vscode.workspace.fs.readDirectory(
              snapshotsDirUri,
            );

            // const bytes = await vscode.workspace.fs.readFile(playgroundMetaUri);
            // const json = JSON.parse(bytes.toString());

            const children = scriptDirEntries.map((snapshot) => {
              const snapshotDirUri = snapshotsDirUri.with({
                path: posix.join(snapshotsDirUri.path, snapshot[0]),
              });
              const idLabel =
                new Date(parseInt(snapshot[0])).toDateString() +
                " " +
                new Date(parseInt(snapshot[0])).toLocaleTimeString();

              return new PlaygroundTreeItem(
                idLabel,
                vscode.TreeItemCollapsibleState.None,
                TreeItemType.Snapshot,
                snapshotDirUri,
                name,
                null,
              );
            });
            children.reverse();

            this.data.push(
              new PlaygroundTreeItem(
                name,
                vscode.TreeItemCollapsibleState.Collapsed,
                TreeItemType.Playground,
                playgroundDirUri,
                null,
                children,

                // json.scripts || [{name: "default", snippet: json.snippet}],
                // json.extVars,
              ),
            );
          }
        } catch (e) {
          console.log("Directory doesn't exist yet, so no playgrounds", e);
        }
      }
      return this.data;
    }
    return element.children;
  }

  public deletePlayground(node: PlaygroundTreeItem) {
    vscode.window
      .showInformationMessage(`Delete Playground ${node.label}?`, "Yes", "No")
      .then(async (answer) => {
        if (answer === "Yes") {
          // Run function
          try {
            console.log("deleting", node.uri);

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

  public async takeSnapshot(node: PlaygroundTreeItem) {
    console.log("takeSnapshot", node.uri);

    const snapshotId = Date.now().toString();

    const snapshotsDirUri = node.uri.with({
      path: posix.join(node.uri.path, "snapshots", snapshotId),
    });

    try {
      await vscode.workspace.fs.createDirectory(snapshotsDirUri);
    } catch (e) {
      vscode.window.showErrorMessage("unable to create directory");
    }

    try {
      await vscode.workspace.fs.copy(
        node.uri.with({
          path: posix.join(node.uri.path, "extVars.json"),
        }),
        snapshotsDirUri.with({
          path: posix.join(snapshotsDirUri.path, "extVars.json"),
        }),
      );
      await vscode.workspace.fs.copy(
        node.uri.with({
          path: posix.join(node.uri.path, "scripts"),
        }),
        snapshotsDirUri.with({
          path: posix.join(snapshotsDirUri.path, "scripts"),
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

    console.log("Selected folder: " + folderUri[0].path);
    console.log(folderUri[0]);

    const d = new Date();
    const localeDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    const fileName = `playground-${node.label}-${localeDate
      .toISOString()
      .substring(0, 10)}.json`;

    const getScripts = async (uri: vscode.Uri) => {
      const scripts = [];
      for (const [name, type] of await vscode.workspace.fs.readDirectory(
        uri.with({path: posix.join(uri.path, "scripts")}),
      )) {
        if (name !== "default") {
          continue;
        }
        const scriptUri = uri.with({
          path: posix.join(uri.path, "scripts", name),
        });

        const bytes = await vscode.workspace.fs.readFile(scriptUri);
        const script = {
          name: name,
          snippet: bytes.toString(),
          errorMessage: "",
        };

        scripts.push(script);
      }

      for (const [name, type] of await vscode.workspace.fs.readDirectory(
        uri.with({path: posix.join(uri.path, "scripts")}),
      )) {
        if (name === "default") {
          continue;
        }
        const scriptUri = uri.with({
          path: posix.join(uri.path, "scripts", name),
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
      for (const [name, type] of await vscode.workspace.fs.readDirectory(
        uri.with({path: posix.join(uri.path, "snapshots")}),
      )) {
        const snapshotDirUri = uri.with({
          path: posix.join(uri.path, "snapshots", name),
        });
        const s = {
          id: parseInt(name),
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

    // const doc = await vscode.workspace.openTextDocument({
    //   language: "json",
    //   content: JSON.stringify(playgroundExport, null, 2),
    // });
    // const editor = await vscode.window.showTextDocument(doc);
    vscode.window.showInformationMessage("Playground exported");
  }

  public importPlayground() {
    console.log("importPlayground");

    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Open",
      filters: {
        "JSON files": ["json"],
      },
    };

    vscode.window.showOpenDialog(options).then(async (fileUri) => {
      if (fileUri && fileUri[0]) {
        console.log("Selected file: " + fileUri[0].path);
        console.log(fileUri[0]);

        const bytes = await vscode.workspace.fs.readFile(fileUri[0]);
        const json = JSON.parse(bytes.toString());

        if (json.type !== "playground-export") {
          vscode.window.showErrorMessage(
            "Error: invalid file type, not a playground export",
          );
          return;
        }

        const playgroundDirUri = this.storageUri.with({
          path: posix.join(this.storageUri.path, json.name),
        });

        try {
          await vscode.workspace.fs.createDirectory(playgroundDirUri);
        } catch (e) {
          vscode.window.showErrorMessage("unable to create directory");
        }

        // const playgroundMetaUri = this.storageUri.with({
        //   path: posix.join(this.storageUri.path, json.name, "playground.json"),
        // });
        // await vscode.workspace.fs.writeFile(playgroundMetaUri, bytes);

        await this.createFiles(playgroundDirUri, json);

        const snapshotsDirUri = this.storageUri.with({
          path: posix.join(this.storageUri.path, json.name, "snapshots"),
        });

        try {
          await vscode.workspace.fs.createDirectory(snapshotsDirUri);
        } catch (e) {
          vscode.window.showErrorMessage("unable to create directory");
        }

        json.snapshots.map(async (snapshot: any) => {
          const snapshotUri = this.storageUri.with({
            path: posix.join(
              this.storageUri.path,
              json.name,
              "snapshots",
              snapshot.id.toString(),
            ),
          });
          await this.createFiles(snapshotUri, snapshot);
        });

        this.refresh();
      }
    });
  }

  public async onSelect(element: PlaygroundTreeItem): Promise<void> {
    if (!element) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        false,
      );

      this.variablesProvider.showIntro(false);
      this.variablesProvider.set(null);
      this.scriptsProvider.set(null);
    } else if (element.type === TreeItemType.Playground) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        true,
      );

      this.variablesProvider.showIntro(true);

      this.variablesProvider.set(element.uri);
      await this.scriptsProvider.set(element.uri);
    } else if (element.type === TreeItemType.Snapshot) {
      vscode.commands.executeCommand(
        "setContext",
        "datatransformer.playgroundSelected",
        true,
      );

      this.variablesProvider.showIntro(true);

      this.variablesProvider.set(element.uri);
      await this.scriptsProvider.set(element.uri);

      // const parent = this.data.find((node) => node.fileUri === element.fileUri);
      // if (parent) {
      //   this.variablesProvider.set(parent.extVars);
      //   this.scriptsProvider.set(parent.scripts);
      // }
    }
  }

  public async addPlayground() {
    console.log("add playground");

    const playgroundName = await vscode.window.showInputBox({
      placeHolder: "playground-name",
      prompt: "Enter a name for the new Playground",
    });

    if (!playgroundName) {
      return;
    }

    if (playgroundName === "") {
      vscode.window.showErrorMessage(
        "Invalid Playground Name - name cannot be empty",
      );
      return;
    }

    if (this.data.find((v) => v.label === playgroundName)) {
      vscode.window.showErrorMessage(
        "Invalid Playground Name - playground with same name already exists",
      );
      return;
    }

    try {
      await vscode.workspace.fs.stat(this.storageUri);
      // vscode.window.showTextDocument(this.storageUri, {
      //   viewColumn: vscode.ViewColumn.Beside,
      // });
    } catch {
      // vscode.window.showInformationMessage(
      //   `${this.storageUri.toString(true)}  does *not* exist`,
      // );
      await vscode.workspace.fs.createDirectory(this.storageUri);
    }

    const json = {
      name: playgroundName,
      extVars: [],
      scripts: [
        {
          name: "default",
          snippet:
            '\n// Import the additional functions library\nlocal f = import "functions";\n\n{\n  id: f.getExecutionId(),\n}',
          errorMessage: "",
        },
      ],
    };

    const playgroundDirUri = this.storageUri.with({
      path: posix.join(this.storageUri.path, json.name),
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

    // const playground = {
    //   type: "playground-export",
    //   version: "1.0.0",
    //   fileName: playgroundName + ".json",
    //   name: playgroundName,
    //   createdAt: Date.now(),
    //   snapshots: [],
    //   scripts: [
    //     {
    //       name: "default",
    //       snippet:
    //         '\n// Import the additional functions library\nlocal f = import "functions";\n\n{\n  id: f.getExecutionId(),\n}',
    //       errorMessage: "",
    //     },
    //   ],
    //   extVars: [],
    // };

    // const writeData = Buffer.from(JSON.stringify(playground, null, 2), "utf8");
    // const fileUri = this.storageUri.with({
    //   path: posix.join(this.storageUri.path, playgroundName + ".json"),
    // });

    // await vscode.workspace.fs.writeFile(fileUri, writeData);

    this.refresh();
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
    if (editor?.document.uri.path.startsWith(this.storageUri.path)) {
      vscode.languages.setTextDocumentLanguage(
        editor.document,
        "datatransformer",
      );

      console.log(
        "winvsmac",
        editor?.document.uri.path.substring(this.storageUri.path.length + 1),
      );

      console.log("separator=", posix.sep);
      const playgroundSplits = editor?.document.uri.path
        .substring(this.storageUri.path.length + 1)
        .split("/");

      console.log(
        playgroundSplits,
        playgroundSplits.length,
        playgroundSplits[0],
        playgroundSplits[2],
      );

      let playgroundTreeItem: PlaygroundTreeItem;

      if (playgroundSplits.length > 3) {
        // console.log(
        //   "reveals",
        //   playgroundsTreeDataProvider.getSnapshot(
        //     playgroundSplits[0],
        //     playgroundSplits[2],
        //   ),
        // );

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

      const title = `Data Transformer Output for '${basename(
        editor.document.fileName,
      )}'`;

      const body = {
        snippet: editor.document.getText(),
        extVars: extVars,
      };

      try {
        this.diagnosticCollection.clear();

        const res = await fetch(`${this.serverUri}/exec`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {"Content-Type": "application/json"},
        });

        const data: any = await res.json();

        if (data.status !== 200) {
          //diagnostics

          const location = data.message.substring(0, data.message.indexOf(" "));

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
            data.message.substring(data.message.indexOf(" ") + 1),
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
        if (!this.panel) {
          this.panel = vscode.window.createWebviewPanel(
            "datatransformerOutput",
            title,
            {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true},
            {},
          );
          this.panel.onDidDispose(() => {
            this.panel = null;
          });
        } else {
          this.panel.title = title;
        }

        const html = `<html>
<head>
</head>
<body>
<pre>
<code style="background-color: transparent;font-size: 12px;">
${data.message}
</code>
</pre>
</body>
</html>`;

        this.panel.webview.html = html;
      } catch (e: any) {
        // vscode.window.showInformationMessage(
        vscode.window.showErrorMessage(
          `Error calling Jsonnet Server: ${e.message} ${e.cause}`,
        );
        if (!this.panel) {
          this.panel = vscode.window.createWebviewPanel(
            "datatransformerOutput",
            title,
            {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true},
            {},
          );
          this.panel.onDidDispose(() => {
            this.panel = null;
          });
        } else {
          this.panel.title = title;
        }

        const html = `<html>
<head>
</head>
<body>
<pre><code style="background-color: transparent;font-size: 12px;">${e.message} ${e.cause}
</code></pre>
</body>
</html>`;

        this.panel.webview.html = html;
      }
    }
  }
}
