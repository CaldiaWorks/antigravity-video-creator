import * as vscode from "vscode";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "openEditor": {
        vscode.commands.executeCommand("remotion-editor.openEditor");
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { padding: 10px; }
          button { 
            width: 100%; 
            padding: 10px; 
            margin-bottom: 10px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            cursor: pointer;
            font-family: var(--vscode-font-family);
          }
          button:hover {
            background-color: var(--vscode-button-hoverBackground);
          }
          .info {
            font-size: 0.9em;
            color: var(--vscode-descriptionForeground);
            margin-top: 20px;
          }
        </style>
			</head>
			<body>
				<button id="open-btn">Open Remotion Editor</button>
        <div class="info">
          <p>Click the button above to launch the Remotion Editor panel.</p>
        </div>

				<script>
					const vscode = acquireVsCodeApi();
          document.getElementById('open-btn').addEventListener('click', () => {
            vscode.postMessage({ type: 'openEditor' });
          });
				</script>
			</body>
			</html>`;
  }
}
