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
import {basename, extname, join} from "path";

type IconPath = {
  light: string | vscode.Uri;
  dark: string | vscode.Uri;
};

export class LibsonnetsTreeItem extends vscode.TreeItem {
  // type: TreeItemType;
  iconPath: vscode.ThemeIcon | IconPath = {
    light: join(
      __filename,
      "..",
      "..",
      "media",
      "jsonnetmapper_24px_bluey.svg",
    ),
    dark: join(__filename, "..", "..", "media", "jsonnetmapper_24px_bluey.svg"),
  };
  uri: vscode.Uri;
  parent?: string;

  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    uri: vscode.Uri,
    parent: string,
  ) {
    super(label, collapsibleState);

    this.uri = uri;
    this.parent = parent;
  }

  contextValue = "LibsonnetsTreeItem";
}

export class LibsonnetsTreeDataProvider
  implements
    vscode.TreeDataProvider<LibsonnetsTreeItem>,
    vscode.TreeDragAndDropController<LibsonnetsTreeItem>
{
  dropMimeTypes = [
    // "application/vnd.code.tree.apigeex-vscode-ApiProxiesTreeItem_Policy",
  ];
  dragMimeTypes = [
    "text/plain",
    // "application/vnd.code.tree.apigeex-vscode-ApiProxiesTreeItem_Policy",
  ];
  // dragMimeTypes = ["application/vnd.code.tree.apigeex-vscode-fred"];

  private textEncoder = new TextEncoder();
  private treeData: LibsonnetsTreeItem[];

  constructor(private readonly libsonnetsRootUri: vscode.Uri) {
    this.treeData = [];
  }

  getParent(
    node: LibsonnetsTreeItem,
  ): vscode.ProviderResult<LibsonnetsTreeItem> {
    if (node instanceof LibsonnetsTreeItem) {
      return null;
    }
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    LibsonnetsTreeItem | undefined | null | void
  > = new vscode.EventEmitter<LibsonnetsTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    LibsonnetsTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(node: LibsonnetsTreeItem): LibsonnetsTreeItem {
    // ): vscode.TreeItem | Thenable<vscode.TreeItem> {

    node.tooltip = "";
    return node;
  }

  async getChildren(
    node?: LibsonnetsTreeItem | undefined,
  ): Promise<LibsonnetsTreeItem[]> {
    if (node === undefined) {
      this.treeData = [];

      if (this.libsonnetsRootUri) {
        try {
          const libsonnetsDirEntries = (
            await vscode.workspace.fs.readDirectory(this.libsonnetsRootUri)
          ).filter(
            ([name, type]) =>
              name !== ".DS_Store" && type === vscode.FileType.File,
          );

          for (const [libsonnetName, _] of libsonnetsDirEntries) {
            const libsonnetUri = vscode.Uri.joinPath(
              this.libsonnetsRootUri,
              libsonnetName,
            );

            this.treeData.push(
              new LibsonnetsTreeItem(
                libsonnetName,
                vscode.TreeItemCollapsibleState.None,
                libsonnetUri,
                null,
              ),
            );
          }
        } catch (e) {
          console.log("Directory doesn't exist yet, so no libsonnets", e);
        }
      }

      return this.treeData;
    }
    return [];
  }

  public async onSelect(node: LibsonnetsTreeItem): Promise<void> {
    if (node) {
      const doc = await vscode.workspace.openTextDocument(node.uri);

      vscode.window.showTextDocument(doc, {
        preview: false,
        viewColumn: vscode.ViewColumn.One,
      });

      vscode.languages.setTextDocumentLanguage(doc, "datatransformer");
    }
  }

  public async addLibsonnet(): Promise<string> {
    const libsonnetName = await vscode.window.showInputBox({
      placeHolder: "libsonnet-name",
      title: "Jsonnet Library Name",
    });

    if (!libsonnetName) {
      return "";
    }

    if (libsonnetName === "") {
      vscode.window.showErrorMessage(
        "Invalid Jsonnet Library Name - name cannot be empty",
      );
      return "";
    }

    if (this.treeData.find((v) => v.label === libsonnetName)) {
      vscode.window.showErrorMessage(
        "Invalid Jsonnet Library Name - jsonnet library with same name already exists",
      );
      return "";
    }

    try {
      await vscode.workspace.fs.stat(this.libsonnetsRootUri);
      // vscode.window.showTextDocument(this.playgroundsRootUri, {
      //   viewColumn: vscode.ViewColumn.Beside,
      // });
    } catch {
      // vscode.window.showInformationMessage(
      //   `${this.playgroundsRootUri.toString(true)}  does *not* exist`,
      // );
      await vscode.workspace.fs.createDirectory(this.libsonnetsRootUri);
    }

    const libsonnetUri = vscode.Uri.joinPath(
      this.libsonnetsRootUri,
      extname(libsonnetName) === ".libsonnet"
        ? libsonnetName
        : libsonnetName + ".libsonnet",
    );
    await vscode.workspace.fs.writeFile(
      libsonnetUri,
      this.textEncoder.encode("{\n  func(a,b)::\n    a + b\n}"),
    );

    vscode.window.showInformationMessage(
      `Jsonnet Library ${basename(libsonnetUri.path)} created`,
    );

    this.refresh();

    return libsonnetName + ".libsonnet";
  }

  getLibsonnet(libsonnetName: string): LibsonnetsTreeItem {
    const libsonnetsTreeItem = this.treeData.find(
      (item) => item.label === libsonnetName,
    );
    return libsonnetsTreeItem;
  }

  public async importLibsonnet(): Promise<string> {
    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Open",
      filters: {
        "Jsonnet Libraries": ["libsonnet"],
      },
    };

    const fileUri = await vscode.window.showOpenDialog(options);
    if (!fileUri || !fileUri[0]) {
      return "";
    }

    await vscode.workspace.fs.copy(
      fileUri[0],
      vscode.Uri.joinPath(this.libsonnetsRootUri, basename(fileUri[0].path)),
    );

    vscode.window.showInformationMessage(
      `Jsonnet Library ${basename(fileUri[0].path)} imported`,
    );

    this.refresh();
    return basename(fileUri[0].path);
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

  public deleteLibsonnet(node: LibsonnetsTreeItem) {
    vscode.window
      .showInformationMessage(
        `Delete Jsonnet Library ${node.label}?`,
        "Yes",
        "No",
      )
      .then(async (answer) => {
        if (answer === "Yes") {
          // Run function
          try {
            await this.closeFileIfOpen(node.uri);
            await vscode.workspace.fs.delete(node.uri, {
              recursive: true,
              useTrash: true,
            });

            vscode.window.showInformationMessage(
              `Jsonnet Library ${node.label} deleted`,
            );
          } catch (e) {
            vscode.window.showErrorMessage("err", e);
          }
          this.refresh();
        }
      });
  }

  public async handleDrag(
    source: LibsonnetsTreeItem[],
    treeDataTransfer: vscode.DataTransfer,
    token: vscode.CancellationToken,
  ): Promise<void> {
    // console.log("drag event", source, treeDataTransfer);

    if (source[0].contextValue === "LibsonnetsTreeItem") {
      const libsonnetName = basename(source[0].label as string, ".libsonnet");
      treeDataTransfer.set(
        "text/plain",
        new vscode.DataTransferItem(
          `local ${libsonnetName} = import '${libsonnetName}.libsonnet';\n`,
        ),
      );
    }
  }
}
