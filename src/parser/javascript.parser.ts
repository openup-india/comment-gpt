import { parse, Node, SourceLocation, Position } from 'acorn'
import { CodeSnippet } from '../types'
const allowedTypes = ['FunctionDeclaration', 'ClassDeclaration']
export function jsparser(code: string): CodeSnippet[] {
  const ast = parse(code, { ecmaVersion: 'latest', locations: true }) as Node
  const nodesInfo: CodeSnippet[] = []

  if (ast.type === 'Program') {
    const programNode = ast as Node & { body: Node[] }
    const body = programNode.body

    for (let node of body) {
      let { type, start, end, loc } = node
      console.debug(node)
      const nodeCode = code.slice(start, end)

      const startPosition = {
        line: loc?.start.line,
        column: loc?.start.column,
      }

      const endPosition = { line: loc?.end.line, column: loc?.end.column }
      let id = ''
      if (type === 'VariableDeclaration') {
        const variableDeclarationNode = node as Node & {
          declarations: Node[]
        }
        const declarations = variableDeclarationNode.declarations
        if (declarations.length > 0) {
          const variableDeclaratorNode = declarations[0] as Node & {
            init?: Node
            id?: Node & { name: string }
          }
          const initNode = variableDeclaratorNode.init
          console.debug(variableDeclaratorNode.id)
          id = variableDeclaratorNode.id?.name ?? 'random' // id not in Function Decl. , improve types and expected return value
          if (initNode?.type === 'ArrowFunctionExpression') {
            type = 'FunctionDeclaration'
          }
        }
      }

      if (allowedTypes.includes(type)) {
        nodesInfo.push({
          id,
          type,
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
