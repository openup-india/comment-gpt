// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { jsparser } from './parser/javascript.parser'
import { CodeSnippet } from './types'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // console.log("Comment GPT started");
  vscode.commands.executeCommand('comment-gpt.startCommentGPT')

  let disposable = vscode.commands.registerCommand(
    'comment-gpt.startCommentGPT',
    () => {
      vscode.window.showInformationMessage('Comment GPT is Running')

      vscode.workspace.onDidChangeTextDocument(
        (e: vscode.TextDocumentChangeEvent) => {
          if (e.document.isDirty) {
            const snippets = jsparser(e.document.getText())
            console.debug(snippets)
          }
        },
      )
    },
  )

  context.subscriptions.push(disposable)
}

const onSnippetAdd = (snippet: CodeSnippet) => {}

// This method is called when your extension is deactivated
export function deactivate() {}
