import * as vscode from "vscode";

import * as path from "path";
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

export class ExtVarsViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  private extVarsState: any;
  private panel: vscode.WebviewPanel | null = null;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _jsonnetServerUri: string,
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    console.log(context.state);

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "stateUpdated": {
          console.log("updatedState=", data.value);
          this.extVarsState = data.value;

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

  public reset() {
    console.log("reset");
    if (this._view) {
      this._view.webview.postMessage({type: "reset"});
    }
  }

  public restore() {
    console.log("restore");
    if (this._view) {
      this._view.webview.postMessage({type: "restore"});
    }
  }

  public save() {
    console.log("save");
  }

  public async exec() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage(
        "Can't open Jsonnet preview because there is no active window",
      );
      return;
    }

    const title = `Data Transformer Output for '${path.basename(
      editor.document.fileName,
    )}'`;

    const body = {
      snippet: editor.document.getText(),
      extVars: this.extVarsState,
    };

    try {
      console.log("calling", this._jsonnetServerUri);

      const res = await fetch(`${this._jsonnetServerUri}/exec`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"},
      });

      const data: any = await res.json();

      if (!this.panel) {
        this.panel = vscode.window.createWebviewPanel(
          "jsonnetPreview",
          title,
          {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true},
          {},
        );
        this.panel.onDidDispose(() => {
          this.panel = null;
        });
      } else {
        this.panel.title = title;
      }

      const html = `<html>
<head>
</head>
<body>
<pre><code style="background-color: transparent;font-size: 12px;">${data.message}
</code></pre>
</body>
</html>`;

      this.panel.webview.html = html;
    } catch (e: any) {
      vscode.window.showErrorMessage(
        `Error calling Jsonnet Server: ${e.message} ${e.cause}`,
      );
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

    const codiconsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "node_modules",
        "@vscode/codicons",
        "dist",
        "codicon.css",
      ),
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
        <link href="${codiconsUri}" rel="stylesheet" />

				<title>Data Transformer Playground</title>
			</head>
			<body>
        <p>Define External Variables that will be passed to the Data Transformer Jsonnet engine</p>
        <br/>
				<button id="addextvar-button">Add External Variable</button>
        <br/>

        <div id="addExtvar">

          <div id="addextvar-panel" >

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
        </div>

        <ul id="extvarUL">
        </ul>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
		</html>`;
  }
}
