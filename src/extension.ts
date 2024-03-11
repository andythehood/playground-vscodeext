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

import {VariablesViewProvider} from "./VariablesViewProvider";
import {HelpTreeDataProvider} from "./HelpTreeDataProvider";
import {LanguageFeaturesProviders} from "./LanguageFeatureProviders";
import {PlaygroundsTreeDataProvider} from "./PlaygroundsTreeDataProvider";
import {ScriptsTreeDataProvider} from "./ScriptsTreeDataProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "appint" is now active!',
    context.storageUri,
  );

  const outputChannel = vscode.window.createOutputChannel("Data Transformer");

  const workbenchConfig = vscode.workspace.getConfiguration(
    "datatransformer.playground",
  );
  let serverUri: string =
    workbenchConfig?.get("serverUri") ||
    "https://datatransformer-playground.web.app";

  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("datatransformer");
  context.subscriptions.push(diagnosticCollection);

  // const myScheme = "script";
  // const myProvider = new (class implements vscode.TextDocumentContentProvider {
  //   // emitter and its event
  //   onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  //   onDidChange = this.onDidChangeEmitter.event;

  //   provideTextDocumentContent(uri: vscode.Uri): string {
  //     // simply invoke cowsay, use uri-path as text
  //     return scriptsTreeDataProvider.provideTextDocumentContent(uri);
  //   }
  // })();
  // context.subscriptions.push(
  //   vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider),
  // );

  // Register the Sidebar Panels

  const variablesViewProvider = new VariablesViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "variablesWebView",
      variablesViewProvider,
    ),
  );

  const scriptsTreeDataProvider = new ScriptsTreeDataProvider(
    context.storageUri,
  );

  const scriptsTreeView = vscode.window.createTreeView("scriptsTreeView", {
    treeDataProvider: scriptsTreeDataProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });
  scriptsTreeView.onDidChangeSelection((e) => {
    console.log("onDidChangeSelection", e);
    scriptsTreeDataProvider.onSelect(e.selection[0]);
  });

  const playgroundsTreeDataProvider = new PlaygroundsTreeDataProvider(
    context.storageUri,
    diagnosticCollection,
    variablesViewProvider,
    scriptsTreeDataProvider,
    serverUri,
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
    console.log(e);
    await playgroundsTreeDataProvider.onSelect(e.selection[0]);
    // scriptsTreeView.reveal(scriptsTreeDataProvider.getDefault(), {
    //   select: true,
    // });

    const editor = vscode.window.activeTextEditor;
    console.log("reveal script", editor);
    setTimeout(
      () =>
        scriptsTreeView.reveal(
          scriptsTreeDataProvider.getActiveOrDefault(editor.document.uri),
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
    serverUri,
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
      console.log("Active Editor Changed: " + editor?.document.uri.path);

      if (editor?.document.uri.path.startsWith(context.storageUri.path)) {
        vscode.languages.setTextDocumentLanguage(
          editor.document,
          "datatransformer",
        );

        const playgroundSplits = editor?.document.uri.path
          .substring(context.storageUri.path.length + 1)
          .split("/");

        console.log(
          playgroundSplits.length,
          playgroundSplits[0],
          playgroundSplits[2],
        );

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
            scriptsTreeDataProvider.getActiveOrDefault(editor.document.uri),
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

  vscode.commands.registerCommand("datatransformer.addPlayground", () => {
    playgroundsTreeDataProvider.addPlayground();
  });

  vscode.commands.registerCommand("datatransformer.importPlayground", () => {
    playgroundsTreeDataProvider.importPlayground();
  });

  vscode.commands.registerCommand("datatransformer.takeSnapshot", (node) => {
    playgroundsTreeDataProvider.takeSnapshot(node);
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
    "datatransformer.selectAndRunScript",
    async (node) => {
      console.log("selectAndRunScript", node);
      await scriptsTreeDataProvider.onSelect(node);

      await scriptsTreeView.reveal(node, {
        select: true,
      }),
        playgroundsTreeDataProvider.exec();
    },
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.collapseAll", () => {
  //     extvarProvider.collapseAll();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.addExtVar", () => {
  //     extvarProvider.addExtVar();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.expandAll", () => {
  //     extvarProvider.expandAll();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.reset", () => {
  //     extvarProvider.reset();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.restore", () => {
  //     extvarProvider.restore();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("datatransformer.save", () => {
  //     extvarProvider.save();
  //   }),
  // );

  let insertSnippetCmd = vscode.commands.registerCommand(
    "datatransformer.insertSnippet",
    () => {
      const snippet = `// Import the additional functions library
local f = import 'functions';

{
  id: f.getExecutionId(),
}
`;
      vscode.window.activeTextEditor?.insertSnippet(
        new vscode.SnippetString(snippet),
      );
    },
  );
  context.subscriptions.push(insertSnippetCmd);

  context.subscriptions.push(
    vscode.commands.registerCommand("datatransformer.runScript", () => {
      playgroundsTreeDataProvider.exec();
    }),
  );

  let exampleTemplateCmd = vscode.commands.registerCommand(
    "datatransformer.exampleTemplate",
    () => {
      const snippet = `// Import additional functions library
local f = import "functions";

// Import External Variables
local j = f.extVar("myJson");
local s = f.extVar("myString");
local x = f.extVar("myXml");
local i = f.extVar("myInt");
local d = f.extVar("myDouble");
local strArr = f.extVar("myStrArray");
local intArr = f.extVar("myIntArray");

// Invoke functions using Standard or the additional library Functions below
// For standard library functions, you can also use f.name() to refer to them
//   e.g f.type() and std.type() are equivalent 

{
  avg: f.avg(intArr),
  contains: f.contains(strArr, s),
  maxArray: f.maxArray(intArr),
  minArray: f.minArray(intArr),
  remove: f.remove(strArr, s),
  removeAt: f.removeAt(intArr, 3),
  sum: f.sum(intArr),
  groupBy: f.groupBy(intArr, function(x) x >= f.avg(intArr)),

  sha1: f.sha1(s),
  sha256: f.sha256(s),
  sha512: f.sha512(s),

  isDecimal: f.isDecimal(d),
  isInteger: f.isInteger(i),
  isOdd: f.isOdd(i),
  isEven: f.isEven(i),

  parseXml: f.parseXml(x, format="badgerfish"),

  nowInMillis: f.nowInMillis(),
  uuid: f.uuid(),
}`;

      vscode.window.activeTextEditor?.insertSnippet(
        new vscode.SnippetString(snippet),
      );
    },
  );
  context.subscriptions.push(exampleTemplateCmd);

  let newTemplateCmd = vscode.commands.registerCommand(
    "datatransformer.newTemplate",
    () => {
      const snippet = `// Import the additional functions library
local f = import "functions";

{
  id: f.getExecutionId(),
}`;

      vscode.window.activeTextEditor?.insertSnippet(
        new vscode.SnippetString(snippet),
      );
    },
  );
  context.subscriptions.push(newTemplateCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
