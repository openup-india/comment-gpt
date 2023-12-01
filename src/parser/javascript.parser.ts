import { parse, Node } from 'acorn'
import {
  CodeSnippet,
  FunctionDeclarationNode,
  VariableDeclarationNode,
} from '../types'

const allowedRoles = ['Function', 'Class']

export function jsparser(code: string): CodeSnippet[] {
  const ast = parse(code, { ecmaVersion: 'latest', locations: true }) as Node
  const nodesInfo: CodeSnippet[] = []

  if (ast.type === 'Program') {
    const programNode = ast as Node & {
      body: Node[]
    }
    const body = programNode.body

    for (let node of body) {
      let { type, start, end, loc } = node
      let id = '',
        role = ''

      if (type === 'FunctionDeclaration') {
        id = (node as FunctionDeclarationNode).id.name
        role = 'Function'
      } else if (type === 'VariableDeclaration') {
        const variableDeclarationNode = node as VariableDeclarationNode
        const declarations = variableDeclarationNode.declarations
        if (declarations.length > 0) {
          const variableDeclaratorNode = declarations[0]
          const initNode = variableDeclaratorNode.init
          if (initNode?.type === 'ArrowFunctionExpression') {
            id = variableDeclaratorNode.id?.name ?? ''
            role = 'Function'
          }
        }
      }

      const nodeCode = code.slice(start, end)

      // This 1 case should never be executed ideally
      const startPosition = {
        line: loc ? loc.start.line - 1 : 0, // Line number starts with 1
        column: loc?.start.column ?? 0, // Col starts with 0
      }

      // This 1 case should never be executed ideally
      const endPosition = {
        line: loc ? loc.end.line - 1 : 0,
        column: loc?.end.column ?? 0,
      }

      if (allowedRoles.includes(role)) {
        nodesInfo.push({
          id,
          type,
          role,
          code: nodeCode,
          startPosition,
          endPosition,
        })
      } else {
        //  else skip
        // console.debug('skipped : ', node)
      }
    }
  }
  return nodesInfo
}
