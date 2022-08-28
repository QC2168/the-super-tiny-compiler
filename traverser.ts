import { NodeTypes, RootNode, ChildNode } from "./ast";
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit?: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption;
}
export function traverser(ast: RootNode, visitor: Visitor) {
  function traverArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverNode(node, parent);
    });
  }
  // 深度优先
  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    // enter
    const methods = visitor[node.type];
    if (methods) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:
        break;
      default:
        break;
    }

    // exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverNode(ast);
}
