import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log("Remotion Editor is active");

  // Activity BarのサイドバーにWebviewを表示
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("remotion.main", sidebarProvider)
  );

  // ステータスバーにもボタンを追加（バックアップ）
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "$(play) Remotion";
  statusBarItem.tooltip = "Open Remotion Editor";
  statusBarItem.command = "remotion-editor.openEditor";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  let disposable = vscode.commands.registerCommand(
    "remotion-editor.openEditor",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "remotionEditor",
        "Remotion Editor",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "out", "webview"),
          ],
        },
      );

      panel.webview.html = getWebviewContent(
        panel.webview,
        context.extensionUri,
      );

      // Webview からのメッセージを受信
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.type) {
            case "webviewReady":
              console.log("Webview is ready");
              vscode.window.showInformationMessage(
                "Remotion Editor: Webview Ready!",
              );
              break;
            case "playStateChanged":
              console.log("Play state changed:", message.isPlaying);
              break;
            case "playerStatus":
              console.log("Player status:", message.status);
              break;
          }
        },
        undefined,
        context.subscriptions,
      );
    },
  );

  // デモ用: コンフィグ更新コマンド
  let updateConfigCommand = vscode.commands.registerCommand(
    "remotion-vscode-editor.updateConfig",
    async () => {
      const fps = await vscode.window.showInputBox({
        prompt: "Enter FPS",
        value: "30",
        validateInput: (value) => {
          const num = parseInt(value);
          return isNaN(num) || num < 1 || num > 120
            ? "FPS must be between 1 and 120"
            : null;
        },
      });

      if (fps) {
        // Note: 実際の実装ではアクティブなパネルへの参照を保持する必要がある
        vscode.window.showInformationMessage(
          `Config update requested: ${fps} FPS`,
        );
      }
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(updateConfigCommand);
}

function getWebviewContent(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
): string {
  const webviewPath = vscode.Uri.joinPath(extensionUri, "out", "webview");
  const indexPath = vscode.Uri.joinPath(webviewPath, "index.html");

  // Create the base uri for the webview
  const baseUri = vscode.Uri.joinPath(extensionUri, "out", "webview");
  console.log("Webview Base URI:", baseUri.fsPath);

  return getHtml(webview, baseUri, indexPath);
}

function getHtml(
  webview: vscode.Webview,
  baseUri: vscode.Uri,
  indexPath: vscode.Uri,
): string {
  try {
    let html = fs.readFileSync(indexPath.fsPath, "utf8");

    // Content Security Policy
    const csp = `
            <meta http-equiv="Content-Security-Policy" 
            content="default-src 'none'; 
                    connect-src ${webview.cspSource} https:;
                    style-src ${webview.cspSource} 'unsafe-inline'; 
                    script-src 'unsafe-inline' 'unsafe-eval' ${webview.cspSource}; 
                    img-src ${webview.cspSource} https: data:;
                    media-src ${webview.cspSource} https: data:;
                    font-src ${webview.cspSource};">
        `;

    html = html.replace("<head>", `<head>\n${csp}`);

    // Replace relative paths with absolute webview URIs
    // Vite uses ./assets/... pattern
    const assetsUri = vscode.Uri.joinPath(baseUri, "assets");

    // Use robust regex to replace ./assets/ paths
    // Handle src="...", href="...", and potentially unquoted if minified (though Vite usually quotes)
    html = html.replace(
      /(\s(src|href)=)("|')\.\/assets\/([^"']+)\3/g,
      (match, prefix, attr, quote, filename) => {
        const assetPath = vscode.Uri.joinPath(assetsUri, filename);
        const uri = webview.asWebviewUri(assetPath);
        console.log(`Rewriting ${attr}: ${filename} -> ${uri}`);
        return `${prefix}${quote}${uri}${quote}`;
      },
    );

    // Remove crossorigin which can cause issues with local resources
    html = html.replace(/crossorigin/g, "");

    // Inject diagnostic script
    html = html.replace(
      "</body>",
      `
            <script>
                console.log("Webview HTML properly loaded");
                window.onerror = function(message, source, lineno, colno, error) {
                    const div = document.createElement('div');
                    div.style.color = 'red';
                    div.style.padding = '10px';
                    div.style.border = '1px solid red';
                    div.textContent = 'Error: ' + message;
                    document.body.prepend(div);
                };
            </script>
        </body>`,
    );

    return html;
  } catch (e) {
    return `<html><body><h1>Failed to load HTML</h1><p>${e}</p></body></html>`;
  }
}

export function deactivate() {}
