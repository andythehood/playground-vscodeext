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
import {basename, extname} from "path";

import {VariablesViewProvider} from "./VariablesViewProvider";
import {HelpTreeDataProvider} from "./HelpTreeDataProvider";
import {LanguageFeaturesProviders} from "./LanguageFeatureProviders";
import {PlaygroundsTreeDataProvider} from "./PlaygroundsTreeDataProvider";
import {
  ScriptsTreeDataProvider,
  ScriptsTreeItem,
  TestCaseTreeItem,
} from "./ScriptsTreeDataProvider";
import {ReadOnlyContentProvider} from "./ReadOnlyContentProvider";
import {
  LibsonnetsTreeDataProvider,
  LibsonnetsTreeItem,
} from "./LibsonnetsTreeDataProvider";

export async function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "datatransformer-playground" is now active!',
  );

  const outputChannel = vscode.window.createOutputChannel("Data Transformer");

  const workbenchConfig = vscode.workspace.getConfiguration("datatransformer");
  const serverUrl: string =
    workbenchConfig?.get("serverUrl") ||
    "https://datatransformer-playground.web.app";

  const playgroundStorageLocation: string =
    workbenchConfig?.get("playgroundStorageLocation") || "";

  let playgroundsRootUri: vscode.Uri = null;
  let libsonnetsRootUri: vscode.Uri = null;

  if (playgroundStorageLocation) {
    try {
      const playgroundsStorageLocationUri = vscode.Uri.file(
        playgroundStorageLocation,
      );

      playgroundsRootUri = vscode.Uri.joinPath(
        playgroundsStorageLocationUri,
        "playgrounds",
      );

      libsonnetsRootUri = vscode.Uri.joinPath(
        playgroundsStorageLocationUri,
        "libsonnets",
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
    libsonnetsRootUri = vscode.Uri.joinPath(context.storageUri, "libsonnets");
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

  if (libsonnetsRootUri) {
    try {
      await vscode.workspace.fs.createDirectory(libsonnetsRootUri);
    } catch (e) {
      vscode.window.showErrorMessage(
        `Unable to create libsonnets folder: ${libsonnetsRootUri.path}`,
      );
      libsonnetsRootUri = null;
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
      "datatransformer-playground-variablesWebView",
      variablesViewProvider,
    ),
  );

  const scriptsTreeDataProvider = new ScriptsTreeDataProvider();

  const scriptsTreeView: vscode.TreeView<ScriptsTreeItem | TestCaseTreeItem> =
    vscode.window.createTreeView("datatransformer-playground-scriptsTreeView", {
      treeDataProvider: scriptsTreeDataProvider,
      showCollapseAll: true,
      canSelectMany: false,
    });
  scriptsTreeView.onDidChangeSelection((e) => {
    scriptsTreeDataProvider.onSelect(e.selection[0]);
  });

  const libsonnetsTreeDataProvider = new LibsonnetsTreeDataProvider(
    libsonnetsRootUri,
  );

  const libsonnetsTreeView: vscode.TreeView<LibsonnetsTreeItem> =
    vscode.window.createTreeView(
      "datatransformer-playground-libsonnetsTreeView",
      {
        treeDataProvider: libsonnetsTreeDataProvider,
        showCollapseAll: true,
        canSelectMany: false,
        dragAndDropController: libsonnetsTreeDataProvider,
      },
    );
  libsonnetsTreeView.onDidChangeSelection((e) => {
    libsonnetsTreeDataProvider.onSelect(e.selection[0]);
  });

  const playgroundsTreeDataProvider = new PlaygroundsTreeDataProvider(
    playgroundsRootUri,
    libsonnetsRootUri,
    diagnosticCollection,
    variablesViewProvider,
    scriptsTreeDataProvider,
    readOnlyContentProvider,
    serverUrl,
    outputChannel,
  );

  const playgroundsTreeView = vscode.window.createTreeView(
    "datatransformer-playground-playgroundsTreeView",
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

  context.subscriptions.push(libsonnetsTreeView);
  context.subscriptions.push(playgroundsTreeView);
  context.subscriptions.push(scriptsTreeView);

  const helpTreeDataProvider = new HelpTreeDataProvider();

  const helpTreeView = vscode.window.createTreeView(
    "datatransformer-playground-helpTreeView",
    {
      treeDataProvider: helpTreeDataProvider,
      showCollapseAll: true,
      canSelectMany: false,
    },
  );
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

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      "datatransformer",
      providers.completionItemProvider,
      ".",
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      "datatransformer",
      providers.documentFormattingEditProvider,
    ),
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
      } else if (
        editor?.document.uri.path
          .toLowerCase()
          .startsWith(libsonnetsRootUri.path.toLowerCase())
      ) {
        libsonnetsTreeView.reveal(
          libsonnetsTreeDataProvider.getLibsonnet(
            basename(editor.document.fileName),
          ),
        );
      }
    }),
  );

  // Register the Commands

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.deletePlayground",
      (node) => playgroundsTreeDataProvider.deletePlayground(node),
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.deleteSnapshot",
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
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.addPlayground",
      async () => {
        const playground = await playgroundsTreeDataProvider.addPlayground();

        setTimeout(
          () =>
            playgroundsTreeView.reveal(
              playgroundsTreeDataProvider.getPlayground(playground, null),
              {select: true, focus: false},
            ),
          200,
        );
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.importPlayground",
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
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.addLibsonnet",
      async () => {
        const libsonnet = await libsonnetsTreeDataProvider.addLibsonnet();
        setTimeout(
          () =>
            libsonnetsTreeView.reveal(
              libsonnetsTreeDataProvider.getLibsonnet(libsonnet),
              {select: true, focus: false},
            ),
          200,
        );
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.importLibsonnet",
      async () => {
        const libsonnet = await libsonnetsTreeDataProvider.importLibsonnet();
        setTimeout(
          () =>
            libsonnetsTreeView.reveal(
              libsonnetsTreeDataProvider.getLibsonnet(libsonnet),
              {select: true, focus: false},
            ),
          200,
        );
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.deleteLibsonnet",
      (node) => libsonnetsTreeDataProvider.deleteLibsonnet(node),
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.takeSnapshot",
      (node) => {
        playgroundsTreeDataProvider.takeSnapshot(node);
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.renameSnapshot",
      (node) => {
        playgroundsTreeDataProvider.renameSnapshot(node);
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.exportPlayground",
      (node) => {
        playgroundsTreeDataProvider.exportPlayground(node);
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.addScript",
      async () => {
        const scriptsTreeItem = await scriptsTreeDataProvider.addScript();
        scriptsTreeView.reveal(scriptsTreeItem, {select: true});
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.deleteScript",
      (node) => {
        scriptsTreeDataProvider.deleteScript(node);
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.addTestCase",
      async (node) => {
        const testCaseTreeItem = await scriptsTreeDataProvider.addTestCase(
          node,
        );

        scriptsTreeView.reveal(testCaseTreeItem, {select: true});
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.saveAsTestCase",
      async () => {
        const scriptsTreeItem = scriptsTreeView.selection[0];

        if (scriptsTreeItem && scriptsTreeItem instanceof ScriptsTreeItem) {
          scriptsTreeDataProvider.saveAsTestCase(scriptsTreeItem);
        } else {
          vscode.window.showInformationMessage("No script selected");
        }

        // const testCaseTreeItem = await scriptsTreeDataProvider.addTestCase(node);

        // scriptsTreeView.reveal(testCaseTreeItem, {select: true});
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.deleteTestCase",
      (node) => {
        scriptsTreeDataProvider.deleteTestCase(node);
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.selectAndRunScript",
      async (node) => {
        await scriptsTreeDataProvider.onSelect(node);

        await scriptsTreeView.reveal(node, {
          select: true,
        });
        playgroundsTreeDataProvider.exec();
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.collapseAll",
      () => {
        variablesViewProvider.collapseAll();
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.addExtVar",
      () => {
        variablesViewProvider.addExtVar();
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.expandAll",
      () => {
        variablesViewProvider.expandAll();
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datatransformer-playground.runScript",
      () => {
        playgroundsTreeDataProvider.exec();
      },
    ),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
