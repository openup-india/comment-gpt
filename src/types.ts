import { Node } from 'acorn'

export interface CodeSnippet {
  id: string
  type: string
  role: string
  code: string
  startPosition: {
    line: number | undefined
    column: number | undefined
  }
  endPosition: {
    line: number | undefined
    column: number | undefined
  }
}

// export interface CustomASTNode extends Node {
//   declarations?: CustomASTNode[]
// }

export interface FunctionDeclarationNode extends Node {
  type: 'FunctionDeclaration'
  id: IdentifierNode
  // body
}

export interface VariableDeclarationNode extends Node {
  type: 'VariableDeclaration'
  kind: 'var' | 'let' | 'const'
  declarations: VariableDeclaratorNode[]
}

interface VariableDeclaratorNode extends Node {
  type: 'VariableDeclarator'
  id: IdentifierNode
  init?: ExpressionNode
}

// Interface for Identifier node
interface IdentifierNode extends Node {
  type: 'Identifier'
  name: string
}

interface ExpressionNode extends Node {
  type: 'Expression' | 'ArrowFunctionExpression'
}
