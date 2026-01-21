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

  // 既存のWebview初期化処理の直後に追加
  
  // slides.json の変更監視
  const watcher = vscode.workspace.createFileSystemWatcher('**/slides.json');
  
  const updateSlides = async (uri: vscode.Uri, panel: vscode.WebviewPanel) => {
    try {
      const fileData = await vscode.workspace.fs.readFile(uri);
      const jsonContent = Buffer.from(fileData).toString('utf8');
      const slides = JSON.parse(jsonContent);
      panel.webview.postMessage({ type: 'updateSlides', slides });
      console.log("Sent updated slides to webview from", uri.fsPath);
    } catch (error) {
      console.error("Failed to read/parse slides.json:", error);
      vscode.window.showErrorMessage("Failed to load slides.json: " + error);
    }
  };

  // 初期ロード
  vscode.workspace.findFiles('**/slides.json', '**/node_modules/**', 1).then(uris => {
    if (uris.length > 0) {
      // パネルが作成された後に送る必要があるため、パネル作成ロジックの中に移動するか
      // ここではパネルインスタンスへの参照が必要だが、activate関数内ではパネルはコマンド実行時に作られる。
      // コマンド実行時のロジックを修正する。
    }
  });

  // コマンド実行時のロジック修正
  let disposable = vscode.commands.registerCommand(
    "remotion-editor.openEditor",
    async () => {
        // パネルが既に存在する場合は再利用するロジックが良いが、今回は簡易的に毎回作成（または既存ロジックに従う）
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

      // Webview構築完了後にスライドデータを送信
      const files = await vscode.workspace.findFiles('**/slides.json', '**/node_modules/**', 1);
      if (files.length > 0) {
        updateSlides(files[0], panel);
      }

      // ファイル変更時のイベントリスナー
      const changeDisposable = watcher.onDidChange(uri => {
          // アクティブなパネルがあれば更新
          updateSlides(uri, panel);
      });
      
      const createDisposable = watcher.onDidCreate(uri => {
          updateSlides(uri, panel);
      });

      // パネル破棄時にリスナーも解除
      panel.onDidDispose(() => {
          changeDisposable.dispose();
          createDisposable.dispose();
      });

      // Webview からのメッセージを受信
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.type) {
            case "webviewReady":
              console.log("Webview is ready");
              // Webview側でReadyになったら初期データを送る手もある
              if (files.length > 0) {
                updateSlides(files[0], panel);
              }
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
