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

export class HelpTreeItem extends vscode.TreeItem {
  children: HelpTreeItem[] | undefined;
  iconPath: vscode.ThemeIcon | undefined;
  url: string | undefined;

  constructor(
    label: string = "help",
    iconPath?: vscode.ThemeIcon,
    url?: string,
    children?: HelpTreeItem[],
  ) {
    super(
      label,
      children === undefined
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Collapsed,
    );
    this.children = children;
    this.iconPath = iconPath;
    this.url = url;
  }

  contextValue = "helptreeitem";

  public async openUrl(): Promise<void> {
    if (this.url) {
      await vscode.env.openExternal(vscode.Uri.parse(this.url));
    }
  }
}

export class HelpTreeDataProvider
  implements vscode.TreeDataProvider<HelpTreeItem>
{
  data: HelpTreeItem[];

  constructor() {
    this.data = [
      new HelpTreeItem(
        "Jsonnet standard library functions reference",
        new vscode.ThemeIcon("link"),
        "https://jsonnet.org/ref/stdlib.html",
      ),
      new HelpTreeItem(
        "Data Transformer functions reference",
        new vscode.ThemeIcon("link"),
        "https://cloud.google.com/application-integration/docs/data-transformer-functions-reference",
      ),
      new HelpTreeItem("Report Issue", new vscode.ThemeIcon("comment")),
      new HelpTreeItem("Like and Subscribe", new vscode.ThemeIcon("thumbsup")),
    ];
  }

  getTreeItem(
    element: HelpTreeItem,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: HelpTreeItem | undefined,
  ): vscode.ProviderResult<HelpTreeItem[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }

  public async openUrl(element: HelpTreeItem): Promise<void> {
    await element.openUrl();
  }
}
