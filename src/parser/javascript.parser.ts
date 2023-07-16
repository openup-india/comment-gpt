import { parse, Node, SourceLocation, Position } from "acorn";
const allowedTypes = ["FunctionDeclaration", "ClassDeclaration"];
export function jsparser(code: string) {
  const ast = parse(code, { ecmaVersion: "latest", locations: true }) as Node;

  if (ast.type === "Program") {
    const programNode = ast as Node & { body: Node[] };
    const body = programNode.body;

    const nodesInfo = [];

    for (let node of body) {
      let { type, start, end, loc } = node;
      const nodeCode = code.slice(start, end);

      const startPosition = {
        line: loc?.start.line,
        column: loc?.start.column,
      };

      const endPosition = { line: loc?.end.line, column: loc?.end.column };
      if (type === "VariableDeclaration") {
        const variableDeclarationNode = node as Node & { declarations: Node[] };
        const declarations = variableDeclarationNode.declarations;
        if (declarations.length > 0) {
          const variableDeclaratorNode = declarations[0] as Node & {
            init?: Node;
          };
          const initNode = variableDeclaratorNode.init;
          if (initNode?.type === "ArrowFunctionExpression") {
            type = "FunctionDeclaration";
          }
        }
      }

      if (allowedTypes.includes(type)) {
        nodesInfo.push({
          type,
          code: nodeCode,
          startPosition,
          endPosition,
        });
      }
      //  else skip
    }

    return nodesInfo;
  }
}
