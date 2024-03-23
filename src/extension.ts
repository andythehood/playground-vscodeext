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
import {extname} from "path";

import {VariablesViewProvider} from "./VariablesViewProvider";
import {HelpTreeDataProvider} from "./HelpTreeDataProvider";
import {LanguageFeaturesProviders} from "./LanguageFeatureProviders";
import {PlaygroundsTreeDataProvider} from "./PlaygroundsTreeDataProvider";
import {ScriptsTreeDataProvider} from "./ScriptsTreeDataProvider";
import {ReadOnlyContentProvider} from "./ReadOnlyContentProvider";

export async function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "appint" is now active!',
    context.storageUri,
  );

  const outputChannel = vscode.window.createOutputChannel("Data Transformer");

  const workbenchConfig = vscode.workspace.getConfiguration("datatransformer");
  const serverUrl: string =
    workbenchConfig?.get("serverUrl") ||
    "https://datatransformer-playground.web.app";

  const playgroundStorageLocation: string =
    workbenchConfig?.get("playgroundStorageLocation") || "";

  let playgroundsRootUri: vscode.Uri = null;

  if (playgroundStorageLocation) {
    try {
      const playgroundsStorageLocationUri = vscode.Uri.file(
        playgroundStorageLocation,
      );

      playgroundsRootUri = vscode.Uri.joinPath(
        playgroundsStorageLocationUri,
        "playgrounds",
      );
    } catch (e) {
      vscode.window.showErrorMessage(
        `Unable to create playgrounds directory: ${playgroundStorageLocation}`,
      );
      return;
    }
  } else if (context.storageUri) {
    await vscode.workspace.fs.createDirectory(context.storageUri);
    playgroundsRootUri = vscode.Uri.joinPath(context.storageUri, "playgrounds");
  } else {
    vscode.window.showInformationMessage(
      "No Workspace or Folder open. Please open a Workspace or Folder to use Data Transformer Playgrounds.",
    );
  }

  if (playgroundsRootUri) {
    try {
      await vscode.workspace.fs.createDirectory(playgroundsRootUri);
    } catch (e) {
      vscode.window.showErrorMessage(
        `Unable to create playgrounds folder: ${playgroundsRootUri.path}`,
      );
      playgroundsRootUri = null;
    }
  }

  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("datatransformer");
  context.subscriptions.push(diagnosticCollection);

  const readOnlyContentProvider = new ReadOnlyContentProvider();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(
      "readonly",
      readOnlyContentProvider,
    ),
  );

  // Register the Sidebar Panels

  const variablesViewProvider = new VariablesViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "variablesWebView",
      variablesViewProvider,
    ),
  );

  const scriptsTreeDataProvider = new ScriptsTreeDataProvider();

  const scriptsTreeView = vscode.window.createTreeView("scriptsTreeView", {
    treeDataProvider: scriptsTreeDataProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });
  scriptsTreeView.onDidChangeSelection((e) => {
    scriptsTreeDataProvider.onSelect(e.selection[0]);
  });

  const playgroundsTreeDataProvider = new PlaygroundsTreeDataProvider(
    playgroundsRootUri,
    diagnosticCollection,
    variablesViewProvider,
    scriptsTreeDataProvider,
    readOnlyContentProvider,
    serverUrl,
    outputChannel,
  );

  const playgroundsTreeView = vscode.window.createTreeView(
    "playgroundsTreeView",
    {
      treeDataProvider: playgroundsTreeDataProvider,
      showCollapseAll: true,
      canSelectMany: false,
    },
  );

  playgroundsTreeView.onDidChangeSelection(async (e) => {
    await playgroundsTreeDataProvider.onSelect(e.selection[0]);

    const editor = vscode.window.activeTextEditor;
    setTimeout(
      () =>
        scriptsTreeView.reveal(
          scriptsTreeDataProvider.getActiveOrDefault(editor?.document.uri),
          {
            select: true,
          },
        ),
      600,
    );
  });

  context.subscriptions.push(playgroundsTreeView);
  context.subscriptions.push(scriptsTreeView);

  const helpTreeDataProvider = new HelpTreeDataProvider();

  const helpTreeView = vscode.window.createTreeView("helpTreeView", {
    treeDataProvider: helpTreeDataProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });
  helpTreeView.onDidChangeSelection((e) =>
    helpTreeDataProvider.openUrl(e.selection[0]),
  );

  context.subscriptions.push(helpTreeView);

  const providers = new LanguageFeaturesProviders(
    serverUrl,
    diagnosticCollection,
  );
  vscode.languages.registerHoverProvider(
    "datatransformer",
    providers.hoverProvider,
  );

  vscode.languages.registerCompletionItemProvider(
    "datatransformer",
    providers.completionItemProvider,
    ".",
  );

  vscode.languages.registerDocumentFormattingEditProvider(
    "datatransformer",
    providers.documentFormattingEditProvider,
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (
        editor?.document.uri.path
          .toLowerCase()
          .startsWith(playgroundsRootUri.path.toLowerCase())
      ) {
        if (extname(editor.document.fileName) !== ".test") {
          vscode.languages.setTextDocumentLanguage(
            editor.document,
            "datatransformer",
          );
        } else {
          vscode.languages.setTextDocumentLanguage(editor.document, "json");
        }

        const playgroundSplits = editor?.document.uri.path
          .substring(playgroundsRootUri.path.length + 1)
          .split("/");

        if (playgroundSplits.length > 3) {
          playgroundsTreeView.reveal(
            playgroundsTreeDataProvider.getPlayground(
              playgroundSplits[0],
              playgroundSplits[2],
            ),
            {select: true, focus: false},
          );
        } else {
          playgroundsTreeView.reveal(
            playgroundsTreeDataProvider.getPlayground(
              playgroundSplits[0],
              null,
            ),
            {select: true, focus: false},
          );

          scriptsTreeView.reveal(
            scriptsTreeDataProvider.getActiveOrDefault(editor?.document.uri),
            {
              select: true,
            },
          );
        }
      }
    }),
  );

  // Register the Commands

  vscode.commands.registerCommand("datatransformer.deletePlayground", (node) =>
    playgroundsTreeDataProvider.deletePlayground(node),
  );

  vscode.commands.registerCommand(
    "datatransformer.deleteSnapshot",
    async (node) => {
      const playgroundName = await playgroundsTreeDataProvider.deleteSnapshot(
        node,
      );

      if (playgroundName) {
        const playgroundNode = playgroundsTreeDataProvider.getPlayground(
          playgroundName,
          null,
        );
        await scriptsTreeDataProvider.set(playgroundNode.uri);
        await variablesViewProvider.set(playgroundNode.uri);
      }
    },
  );

  vscode.commands.registerCommand("datatransformer.addPlayground", async () => {
    const playground = await playgroundsTreeDataProvider.addPlayground();

    setTimeout(
      () =>
        playgroundsTreeView.reveal(
          playgroundsTreeDataProvider.getPlayground(playground, null),
          {select: true, focus: false},
        ),
      200,
    );
  });

  vscode.commands.registerCommand(
    "datatransformer.importPlayground",
    async () => {
      const playground = await playgroundsTreeDataProvider.importPlayground();
      setTimeout(
        () =>
          playgroundsTreeView.reveal(
            playgroundsTreeDataProvider.getPlayground(playground, null),
            {select: true, focus: false},
          ),
        200,
      );
    },
  );

  vscode.commands.registerCommand("datatransformer.takeSnapshot", (node) => {
    playgroundsTreeDataProvider.takeSnapshot(node);
  });

  vscode.commands.registerCommand("datatransformer.renameSnapshot", (node) => {
    playgroundsTreeDataProvider.renameSnapshot(node);
  });

  vscode.commands.registerCommand(
    "datatransformer.exportPlayground",
    (node) => {
      playgroundsTreeDataProvider.exportPlayground(node);
    },
  );

  vscode.commands.registerCommand("datatransformer.addScript", async () => {
    const scriptsTreeItem = await scriptsTreeDataProvider.addScript();
    scriptsTreeView.reveal(scriptsTreeItem, {select: true});
  });

  vscode.commands.registerCommand("datatransformer.deleteScript", (node) => {
    scriptsTreeDataProvider.deleteScript(node);
  });

  vscode.commands.registerCommand(
    "datatransformer.addTestCase",
    async (node) => {
      const testCaseTreeItem = await scriptsTreeDataProvider.addTestCase(node);

      scriptsTreeView.reveal(testCaseTreeItem, {select: true});
    },
  );

  vscode.commands.registerCommand("datatransformer.deleteTestCase", (node) => {
    scriptsTreeDataProvider.deleteTestCase(node);
  });

  vscode.commands.registerCommand(
    "datatransformer.selectAndRunScript",
    async (node) => {
      await scriptsTreeDataProvider.onSelect(node);

      await scriptsTreeView.reveal(node, {
        select: true,
      });
      playgroundsTreeDataProvider.exec();
    },
  );

  vscode.commands.registerCommand("datatransformer.collapseAll", () => {
    variablesViewProvider.collapseAll();
  });

  vscode.commands.registerCommand("datatransformer.addExtVar", () => {
    variablesViewProvider.addExtVar();
  });

  vscode.commands.registerCommand("datatransformer.expandAll", () => {
    variablesViewProvider.expandAll();
  });

  vscode.commands.registerCommand("datatransformer.runScript", () => {
    playgroundsTreeDataProvider.exec();
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
