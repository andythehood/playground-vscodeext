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
import {
  // createFunctionsSuggestions,
  // createStdlibSuggestions,
  functionsCompletionItems,
  stdlibCompletionItems,
} from "./completionItems";

export class LanguageFeaturesProviders {
  // private jsonnetServerUri: string;
  public documentFormattingEditProvider: vscode.DocumentFormattingEditProvider;

  constructor(
    _jsonnetServerUri: string,
    _diagnosticCollection: vscode.DiagnosticCollection,
  ) {
    // console.log("LanguageFeaturesProviders", jsonnetServerUri);
    // this.jsonnetServerUri = _jsonnetServerUri;

    this.documentFormattingEditProvider = {
      async provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
      ): Promise<vscode.TextEdit[]> {
        console.log("provideDocumentFormattingEdits");

        const text = document.getText();

        const r = new vscode.Range(
          document.positionAt(0),
          document!.positionAt(text.length),
        );

        const request = {
          snippet: text,
        };

        _diagnosticCollection.clear();

        const res = await fetch(`http://localhost:8080/format`, {
          method: "POST",
          body: JSON.stringify(request),
          headers: {"Content-Type": "application/json"},
        });

        const {status, message} = (await res.json()) as {
          status: number;
          message: string;
        };

        if (status !== 200) {
          // connection.sendNotification(NotificationType)
          console.log("Error calling Format:", message);

          const location = message.substring(0, message.indexOf(" "));

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
            message.substring(message.indexOf(" ") + 1),
            vscode.DiagnosticSeverity.Error,
          );

          _diagnosticCollection.set(document.uri, [diag]);

          return [];
        }

        const textEdit = vscode.TextEdit.replace(r, message);

        console.log("wtf2");
        return [textEdit];
      },
    };
  }

  public completionItemProvider = {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
    ): vscode.ProviderResult<vscode.CompletionItem[]> {
      console.log("provideCompletionItems");

      const lineAt = document.lineAt(position.line);

      if (lineAt.text.match(/\bf\.$/)) {
        return functionsCompletionItems.concat(stdlibCompletionItems);
      } else if (lineAt.text.match(/\bstd\.$/)) {
        return stdlibCompletionItems;
      } else {
        return [];
      }
    },
  };

  public hoverProvider = {
    provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
    ): vscode.ProviderResult<vscode.Hover> {
      const range = document.getWordRangeAtPosition(position);

      const func = document.getText(range);
      const lineTo = new vscode.Position(range.start.line, 0);
      // range.start.character = 0;

      const r = new vscode.Range(lineTo, range.end);

      const line = document.getText(r);

      if (line.match(/\bf\.\w+$/)) {
        const items = functionsCompletionItems
          .concat(stdlibCompletionItems)
          .filter((item) => item.label === func);
        if (items && items.length > 0) {
          const markdown = new vscode.MarkdownString(`|f.${items[0].detail}|
|:----|
|${items[0].documentation}|`);
          return {
            contents: [markdown],
          };
        } else {
          return {
            contents: [],
          };
        }
      } else if (line.match(/\bstd\.\w+$/)) {
        const items = stdlibCompletionItems.filter(
          (item) => item.label === func,
        );
        if (items && items.length > 0) {
          const markdown = new vscode.MarkdownString(`|std.${items[0].detail}|
|:----|
|${items[0].documentation}|`);
          return {
            contents: [markdown],
          };
        } else {
          return {
            contents: [],
          };
        }
      }
    },
  };
}
