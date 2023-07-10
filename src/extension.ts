// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // console.log("Comment GPT started");
  vscode.commands.executeCommand("comment-gpt.startCommentGPT");

  let disposable = vscode.commands.registerCommand(
    "comment-gpt.startCommentGPT",
    () => {
      vscode.window.showInformationMessage("Comment GPT is Running");

      vscode.workspace.onDidChangeTextDocument(
        (e: vscode.TextDocumentChangeEvent) => {
          if (e.document.isDirty) {
            console.debug(e.document.getText());
          }
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
