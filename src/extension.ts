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

import {ExtVarsViewProvider} from "./ExtVarsViewProvider";
import {HelpTreeDataProvider} from "./HelpTreeDataProvider";
import {LanguageFeaturesProviders} from "./LanguageFeatureProviders";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "datatransformer" is now active!',
  );

  const workbenchConfig = vscode.workspace.getConfiguration(
    "datatransformer.playground",
  );
  let jsonnetServerUri: string =
    workbenchConfig?.get("jsonnetServerUri") || "http://localhost:8080";

  // Register the Sidebar Panels
  const extvarProvider = new ExtVarsViewProvider(
    context.extensionUri,
    jsonnetServerUri,
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("extVarsView", extvarProvider),
  );

  const helpTreeDataProvider = new HelpTreeDataProvider();

  const helpTreeView = vscode.window.createTreeView("helpView", {
    treeDataProvider: helpTreeDataProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });
  helpTreeView.onDidChangeSelection((e) =>
    helpTreeDataProvider.openUrl(e.selection[0]),
  );

  context.subscriptions.push(helpTreeView);

  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("datatransformer");
  context.subscriptions.push(diagnosticCollection);

  const providers = new LanguageFeaturesProviders(
    jsonnetServerUri,
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

  // Register the Commands

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.collapseAll", () => {
      extvarProvider.collapseAll();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.addExtVar", () => {
      extvarProvider.addExtVar();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.expandAll", () => {
      extvarProvider.expandAll();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.reset", () => {
      extvarProvider.reset();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.restore", () => {
      extvarProvider.restore();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.save", () => {
      extvarProvider.save();
    }),
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let insertSnippetCmd = vscode.commands.registerCommand(
    "playground.insertSnippet",
    () => {
      const snippet = `local f = import 'functions';

`;
      vscode.window.activeTextEditor?.insertSnippet(
        new vscode.SnippetString(snippet),
      );
    },
  );
  context.subscriptions.push(insertSnippetCmd);

  context.subscriptions.push(
    vscode.commands.registerCommand("playground.previewToSide", () => {
      extvarProvider.exec();
    }),
  );

  let newTemplateCmd = vscode.commands.registerCommand(
    "playground.newTemplate",
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
  context.subscriptions.push(newTemplateCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
