// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { jsparser } from './parser/javascript.parser'
import { bulkCommentsFromSnippets, getCommentFromCode } from './llm/comment.llm'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Auto Start command
  // vscode.commands.executeCommand('comment-gpt.startCommentGPT')

  const initCommand = vscode.commands.registerCommand(
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

  const generateCommentsForFileCommand = vscode.commands.registerCommand(
    'comment-gpt.generateCommentsForFile',
    async () => {
      vscode.window.showInformationMessage(
        'Processing File and Generating Comments',
      )

      const editor = vscode.window.activeTextEditor

      if (editor) {
        try {
          const file = editor.document.getText()
          const snippets = await bulkCommentsFromSnippets(jsparser(file)) // Generate comments using LLM

          const edits: vscode.TextEdit[] = []

          snippets.forEach(async (snippet, i) => {
            if (!snippet.comment) {
              console.error('Unable to Generate Comments for All Snippets')
              return
            }

            const position = new vscode.Position(
              snippet.startPosition.line,
              snippet.startPosition.column,
            )

            edits.push(vscode.TextEdit.insert(position, snippet.comment)) // All edits will be applied together as a WorkspaceEdit
          })

          const workspaceEdit = new vscode.WorkspaceEdit()
          workspaceEdit.set(editor.document.uri, edits)
          vscode.workspace.applyEdit(workspaceEdit)
          vscode.window.showInformationMessage('Completed')
        } catch (error) {
          console.error('ERROR OCCURED: ', error)
        }
      } else {
        vscode.window.showErrorMessage('No active text editor found.')
      }
    },
  )

  context.subscriptions.push(initCommand, generateCommentsForFileCommand)
}

// This method is called when your extension is deactivated
export function deactivate() {}
