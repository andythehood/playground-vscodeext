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

// import * as path from "path";
// import {execSync} from "child_process";

const getNonce = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export class VariablesViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  private extVarsUri: vscode.Uri | null = null;
  private textEncoder = new TextEncoder();

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    console.log("resolveWebviewView", context.state);

    webviewView.onDidChangeVisibility(async () => {
      console.log("onDidChangeVisibility", webviewView.visible);

      if (webviewView.visible) {
        if (this.extVarsUri) {
          const bytes = await vscode.workspace.fs.readFile(this.extVarsUri);
          const extVars = JSON.parse(bytes.toString());
          if (this._view) {
            this._view.webview.postMessage({
              type: "set",
              playgroundSelected: true,
              extVars: extVars,
            });
          } else {
            if (this._view) {
              this._view.webview.postMessage({
                type: "set",
                playgroundSelected: false,
                extVars: [],
              });
            }
          }
        }
      }
    });

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "stateUpdated": {
          console.log("updatedState=", data.value);

          if (this.extVarsUri) {
            await vscode.workspace.fs.writeFile(
              this.extVarsUri,
              this.textEncoder.encode(
                JSON.stringify(data.value.extVars, null, 2),
              ),
            );
          }
          break;
        }
      }
    });
  }

  public addExtVar() {
    if (this._view) {
      this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
      this._view.webview.postMessage({type: "addExtVar"});
    }
  }

  public collapseAll() {
    if (this._view) {
      this._view.webview.postMessage({type: "collapseAll"});
    }
  }
  public expandAll() {
    if (this._view) {
      this._view.webview.postMessage({type: "expandAll"});
    }
  }

  public async set(playgroundUri: vscode.Uri) {
    console.log("set extvars", playgroundUri);

    let extVars: any = [];

    if (playgroundUri) {
      const extVarsUri = playgroundUri.with({
        path: posix.join(playgroundUri.path, "extVars.json"),
      });
      this.extVarsUri = extVarsUri;

      const bytes = await vscode.workspace.fs.readFile(extVarsUri);
      extVars = JSON.parse(bytes.toString());
      if (this._view) {
        this._view.webview.postMessage({
          type: "set",
          playgroundSelected: true,
          extVars: extVars,
        });
      }
    } else {
      this.extVarsUri = null;
      if (this._view) {
        this._view.webview.postMessage({
          type: "set",
          playgroundSelected: false,
          extVars: [],
        });
      }
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js"),
    );

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"),
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css"),
    );

    const codiconUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "codicon.css"),
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy"  content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
        <link href="${codiconUri}" rel="stylesheet" />

				<title>Data Transformer Playground</title>
			</head>
			<body>
        <div id="intro_default"
          <p>Please select a playground.</p>
        </div>
        <div id="intro"
          <p>Define variables that will be passed to the Data Transformer Jsonnet engine</p>
          <br/>
				  <button id="addextvar-button">Add Variable</button>
          <br/>
        </div>

        <div id="addextvar-panel">

          <p class="addextvar-title" >Name:</p>
          <textarea  id="addextvar-name" rows="1" placeholder="Enter name..."  ></textarea>

          <fieldset id="addextvar-radiogroup">
            <legend class="addextvar-title">Type:</legend>
              <input class="addextvar-radio" type="radio" id="string" name="string" value="string" checked ">
              <label class="addextvar-label"  for="string">String</label>
              <input class="addextvar-radio" type="radio" id="json" name="json" value="json" />
              <label class="addextvar-label" for="json">Json</label>
              <input class="addextvar-radio" type="radio" id="array" name="array" value="array" />
              <label class="addextvar-label" for="array">Array</label>
              <input class="addextvar-radio" type="radio" id="int" name="int" value="int" />
              <label class="addextvar-label" for="int">Integer</label>
              <input class="addextvar-radio" type="radio" id="double" name="double" value="double" />
              <label class="addextvar-label" for="double">Double</label>
          </fieldset>

          <p class="addextvar-title">Value:</p>
          <textarea id="addextvar-value" placeholder="Enter value..." ></textarea>
          <button id="addextvar-cancel" >Cancel</button>
          <button id="addextvar-add" >Add</button>

        </div>

        <ul id="extvarUL">
        </ul>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
		</html>`;
  }
}
