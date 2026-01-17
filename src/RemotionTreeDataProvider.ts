import * as vscode from "vscode";

export class RemotionTreeDataProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    const item = new vscode.TreeItem(element);
    item.command = {
      command: "remotion-editor.openEditor",
      title: "Open Editor"
    };
    return item;
  }

  getChildren(): string[] {
    return ["📹 Open Remotion Editor"];
  }
}
