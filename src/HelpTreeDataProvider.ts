import * as vscode from "vscode";

// export class OpenUrlTreeItem extends HelpTreeItem {
//   private _url: string;

//   public constructor(
//     parent: AzExtParentTreeItem,
//     label: string,
//     url: string,
//     iconPath?: vscode.ThemeIcon,
//   ) {
//     super(parent, {
//       commandId: "vscode-docker.openUrl",
//       contextValue: "openUrl",
//       iconPath: iconPath ?? new vscode.ThemeIcon("globe"),
//       includeInTreeItemPicker: true,
//       label,
//     });
//     this._url = url;
//   }

//   public async openUrl(): Promise<void> {
//     await vscode.env.openExternal(vscode.Uri.parse(this._url));
//   }
// }

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
