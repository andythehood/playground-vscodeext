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
import {posix} from "path";

export class ScriptsTreeItem extends vscode.TreeItem {
  iconPath: vscode.ThemeIcon = new vscode.ThemeIcon("json");
  uri: vscode.Uri;
  label: string;

  constructor(label: string = "default", uri?: vscode.Uri) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.uri = uri;
    this.label = label;
  }
  contextValue =
    this.label === "default" ? "ScriptsTreeItem_default" : "ScriptsTreeItem";
}

export class ScriptsTreeDataProvider
  implements vscode.TreeDataProvider<ScriptsTreeItem>
{
  private data: ScriptsTreeItem[];
  private textEncoder = new TextEncoder();
  private scriptsDirUri: vscode.Uri | null = null;

  constructor() {
    console.log("constructor");

    this.data = [];
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    ScriptsTreeItem | undefined | null | void
  > = new vscode.EventEmitter<ScriptsTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ScriptsTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getParent(element: ScriptsTreeItem): vscode.ProviderResult<ScriptsTreeItem> {
    return null;
  }

  getActiveOrDefault(uri: vscode.Uri): ScriptsTreeItem {
    console.log("getDefault", uri, this.data);

    return this.data.find((item) => item.uri.path === uri.path) || this.data[0];
  }

  getTreeItem(
    element: ScriptsTreeItem,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    console.log("getTreeItem", element);

    return element;
  }

  async getChildren(
    element?: ScriptsTreeItem | undefined,
  ): Promise<ScriptsTreeItem[]> {
    console.log("ScriptsTreeItem:getChildren", element);
    if (element === undefined) {
      return this.data;
    }
    return null;
  }

  public async set(playgroundUri: vscode.Uri) {
    // This is to reset the SelectedItem so that the onChange trigger fires again
    this.data = [];
    this.refresh();

    let scriptDirEntries = [];
    if (playgroundUri) {
      const scriptsDirUri = playgroundUri.with({
        path: posix.join(playgroundUri.path, "scripts"),
      });
      this.scriptsDirUri = scriptsDirUri;

      scriptDirEntries = await vscode.workspace.fs.readDirectory(scriptsDirUri);

      setTimeout(() => {
        this.data = scriptDirEntries.map((script) => {
          const scriptUri = scriptsDirUri.with({
            path: posix.join(scriptsDirUri.path, script[0]),
          });

          return new ScriptsTreeItem(script[0], scriptUri);
        });

        this.data = this.data
          .filter((item) => item.label === "default")
          .concat(this.data.filter((item) => item.label !== "default"));
        this.refresh();
      }, 100);
    }
  }

  async closeFileIfOpen(file: vscode.Uri): Promise<void> {
    const tabs: vscode.Tab[] = vscode.window.tabGroups.all
      .map((tg) => tg.tabs)
      .flat();
    const index = tabs.findIndex(
      (tab) =>
        tab.input instanceof vscode.TabInputText &&
        tab.input.uri.path === file.path,
    );
    if (index !== -1) {
      await vscode.window.tabGroups.close(tabs[index]);
    }
  }

  public async deleteScript(node: ScriptsTreeItem) {
    vscode.window
      .showInformationMessage(`Delete Script ${node.label}?`, "Yes", "No")
      .then(async (answer) => {
        if (answer === "Yes") {
          // Run function

          await vscode.workspace.fs.delete(node.uri);

          this.closeFileIfOpen(node.uri);

          this.data = this.data.filter((script) => script.label !== node.label);
          vscode.window.showInformationMessage("Deleting Script");

          this.refresh();
        }
      });
  }

  public async addScript(): Promise<ScriptsTreeItem> {
    const scriptName = await vscode.window.showInputBox({
      placeHolder: "script-name",
      prompt: "Enter a name for the new Script",
    });

    if (!scriptName) {
      return null;
    }

    if (scriptName === "") {
      vscode.window.showErrorMessage(
        "Invalid Script Name - name cannot be empty",
      );
      return null;
    }

    if (this.data.find((v) => v.label === scriptName)) {
      vscode.window.showErrorMessage(
        "Invalid Script Name - script with same name already exists",
      );
      return null;
    }

    const snippet =
      '\n// Import the additional functions library\nlocal f = import "functions";\n\n{\n  id: f.getExecutionId(),\n}';

    const scriptUri = this.scriptsDirUri.with({
      path: posix.join(this.scriptsDirUri.path, scriptName),
    });

    await vscode.workspace.fs.writeFile(
      scriptUri,
      this.textEncoder.encode(snippet),
    );

    const scriptsTreeItem = new ScriptsTreeItem(scriptName, scriptUri);

    this.data.push(scriptsTreeItem);

    this.refresh();
    return scriptsTreeItem;
  }

  public async onSelect(node: ScriptsTreeItem): Promise<void> {
    if (node) {
      const doc = await vscode.workspace.openTextDocument(node.uri);

      vscode.window.showTextDocument(doc, {preview: false});
      vscode.languages.setTextDocumentLanguage(doc, "datatransformer");
    }
  }
}
