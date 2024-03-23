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

export class TestCaseTreeItem extends vscode.TreeItem {
  iconPath: vscode.ThemeIcon | IconPath = new vscode.ThemeIcon(
    "json",
    // new vscode.ThemeColor("charts.yellow"),
    new vscode.ThemeColor("terminal.ansiBrightYellow"),
  );
  uri: vscode.Uri;
  label: string;
  children: TestCaseTreeItem[] | undefined;

  constructor(label: string = "expected output", uri: vscode.Uri) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.uri = uri;
    this.label = label;
  }
  contextValue = "TestCaseTreeItem";
}

export class ScriptsTreeItem extends vscode.TreeItem {
  // iconPath: vscode.ThemeIcon = new vscode.ThemeIcon("json");
  iconPath: vscode.ThemeIcon | IconPath = {
    light: join(__filename, "..", "..", "media", "jsonnet_light.svg"),
    dark: join(__filename, "..", "..", "media", "jsonnet_dark.svg"),
  };

  uri: vscode.Uri;
  label: string;
  children: TestCaseTreeItem[];

  constructor(
    label: string = "default",
    collapsibleState: vscode.TreeItemCollapsibleState,
    uri?: vscode.Uri,
    children?: TestCaseTreeItem[],
  ) {
    super(label, collapsibleState);
    this.label = label;
    this.uri = uri;
    this.children = children || [];
  }
  contextValue =
    this.label === "default" ? "ScriptsTreeItem_default" : "ScriptsTreeItem";
}

export class ScriptsTreeDataProvider
  implements vscode.TreeDataProvider<ScriptsTreeItem | TestCaseTreeItem>
{
  private treeData: ScriptsTreeItem[];
  private textEncoder = new TextEncoder();
  private scriptsDirUri: vscode.Uri | null = null;

  constructor() {
    this.treeData = [];
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

  getParent(
    node: ScriptsTreeItem | TestCaseTreeItem,
  ): vscode.ProviderResult<ScriptsTreeItem> {
    if (node instanceof ScriptsTreeItem) {
      return null;
    } else {
      return (
        this.treeData.find(
          (item) => item.label === basename(node.uri.path, ".test"),
        ) || null
      );
    }
  }

  getActiveOrDefault(uri: vscode.Uri): ScriptsTreeItem | TestCaseTreeItem {
    if (!uri) {
      return this.treeData[0];
    }

    if (extname(uri.path) === ".test") {
      const scriptUriPath = uri.path.substring(0, uri.path.length - 5);
      return (
        this.treeData.find(
          (item) => item.uri.path.toLowerCase() === scriptUriPath.toLowerCase(),
        ).children[0] || this.treeData[0]
      );
    } else {
      return (
        this.treeData.find(
          (item) => item.uri.path.toLowerCase() === uri.path.toLowerCase(),
        ) || this.treeData[0]
      );
    }
  }

  getTreeItem(
    node: ScriptsTreeItem | TestCaseTreeItem,
  ): ScriptsTreeItem | TestCaseTreeItem {
    // ): vscode.TreeItem | Thenable<vscode.TreeItem> {

    node.tooltip = "";

    if (node instanceof TestCaseTreeItem || node?.children?.length === 0) {
      node.collapsibleState = vscode.TreeItemCollapsibleState.None;
    } else {
      node.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    }

    return node;
  }

  async getChildren(
    node?: ScriptsTreeItem | undefined,
  ): Promise<ScriptsTreeItem[] | TestCaseTreeItem[]> {
    if (node === undefined) {
      return this.treeData;
    }
    return node.children;
  }

  public async set(playgroundUri: vscode.Uri) {
    // This is to reset the SelectedItem so that the onChange trigger fires again
    this.treeData = [];
    this.refresh();

    // let scriptsDirEntries: [string, vscode.FileType][] = [];
    if (playgroundUri) {
      const scriptsDirUri = vscode.Uri.joinPath(playgroundUri, "scripts");

      // const scriptsDirUri = playgroundUri.with({
      //   path: posix.join(playgroundUri.path, "scripts"),
      // });
      this.scriptsDirUri = scriptsDirUri;

      const scriptsDirEntries = (
        await vscode.workspace.fs.readDirectory(scriptsDirUri)
      ).filter(
        ([name, type]) =>
          name !== ".DS_Store" &&
          type === vscode.FileType.File &&
          extname(name) !== ".test",
      );

      setTimeout(async () => {
        const treeData: ScriptsTreeItem[] = [];

        for (const [name, _] of scriptsDirEntries) {
          const scriptUri = vscode.Uri.joinPath(scriptsDirUri, name);

          const children: TestCaseTreeItem[] = [];

          const testCaseUri = scriptUri.with({
            path: scriptUri.path + ".test",
          });

          try {
            await vscode.workspace.fs.stat(testCaseUri);
            const testCaseTreeItem = new TestCaseTreeItem(
              "expected output",
              testCaseUri,
            );
            children.push(testCaseTreeItem);
          } catch {}

          treeData.push(
            new ScriptsTreeItem(
              name,
              vscode.TreeItemCollapsibleState.Collapsed,
              scriptUri,
              children,
            ),
          );
        }

        // Arrange the treeData order, so that 'default' is always first
        this.treeData = treeData
          .filter((item) => item.label === "default")
          .concat(treeData.filter((item) => item.label !== "default"));

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
        tab.input.uri.path.toLowerCase() === file.path.toLowerCase(),
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

          const testCaseUri = node.uri.with({
            path: node.uri.path + ".test",
          });

          await vscode.workspace.fs.delete(node.uri);
          this.closeFileIfOpen(node.uri);

          try {
            await vscode.workspace.fs.delete(testCaseUri);
          } catch {}

          this.closeFileIfOpen(testCaseUri);

          this.treeData = this.treeData.filter(
            (script) => script.label !== node.label,
          );
          vscode.window.showInformationMessage("Deleted Script");

          this.refresh();
        }
      });
  }

  public async addScript(): Promise<ScriptsTreeItem> {
    const scriptName = await vscode.window.showInputBox({
      placeHolder: "script-name",
      title: "Script Name",
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

    if (this.treeData.find((node) => node.label === scriptName)) {
      vscode.window.showErrorMessage(
        "Invalid Script Name - script with same name already exists",
      );
      return null;
    }

    const snippet =
      "\n// Import the additional functions library\nlocal f = import 'functions';\n\n{\n  id: f.getExecutionId(),\n}";

    const scriptUri = vscode.Uri.joinPath(this.scriptsDirUri, scriptName);

    await vscode.workspace.fs.writeFile(
      scriptUri,
      this.textEncoder.encode(snippet),
    );

    const scriptsTreeItem = new ScriptsTreeItem(
      scriptName,
      vscode.TreeItemCollapsibleState.Collapsed,
      scriptUri,
    );

    this.treeData.push(scriptsTreeItem);

    this.refresh();
    return scriptsTreeItem;
  }

  public async onSelect(
    node: ScriptsTreeItem | TestCaseTreeItem,
  ): Promise<void> {
    if (node) {
      const doc = await vscode.workspace.openTextDocument(node.uri);

      vscode.window.showTextDocument(doc, {
        preview: false,
        viewColumn: vscode.ViewColumn.One,
      });
      if (node instanceof ScriptsTreeItem) {
        vscode.languages.setTextDocumentLanguage(doc, "datatransformer");
      } else {
        vscode.languages.setTextDocumentLanguage(doc, "json");
      }
    }
  }

  public async addTestCase(node: ScriptsTreeItem): Promise<TestCaseTreeItem> {
    if (node.children.length === 0) {
      const testCaseUri = node.uri.with({
        path: node.uri.path + ".test",
      });

      try {
        await vscode.workspace.fs.stat(testCaseUri);
      } catch {
        const testCase = JSON.stringify({}, null, 2);

        await vscode.workspace.fs.writeFile(
          testCaseUri,
          this.textEncoder.encode(testCase),
        );
      }

      const testCaseTreeItem = new TestCaseTreeItem(
        "expected output",
        testCaseUri,
      );

      const index = this.treeData.findIndex((n) => n.label === node.label);

      this.treeData[index].collapsibleState =
        vscode.TreeItemCollapsibleState.Expanded;
      this.treeData[index].children.push(testCaseTreeItem);

      this.refresh();
      return this.treeData[index].children[0];
    } else {
      this.refresh();
      return node.children[0];
    }
  }

  public async deleteTestCase(node: TestCaseTreeItem) {
    const scriptUriPath = node.uri.path.substring(0, node.uri.path.length - 5);

    const scriptNode = this.treeData.find(
      (item) => item.uri.path.toLowerCase() === scriptUriPath.toLowerCase(),
    );

    vscode.window
      .showInformationMessage(
        `Delete Test Script for ${scriptNode.label}?`,
        "Yes",
        "No",
      )
      .then(async (answer) => {
        if (answer === "Yes") {
          // Run function

          await vscode.workspace.fs.delete(node.uri);

          if (scriptNode) {
            scriptNode.children = [];
          }

          this.closeFileIfOpen(node.uri);

          vscode.window.showInformationMessage("Deleted Test Case");

          this.refresh();
        }
      });
  }

  getTestCaseNode(label: string): TestCaseTreeItem {
    const parent = this.treeData.find((node) => node.label === label);

    if (parent.children.length === 0) {
      return null;
    } else {
      return parent.children[0];
    }
  }
}
