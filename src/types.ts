export interface CodeSnippet {
  id: string
  type: string
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
