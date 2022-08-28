import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";
import { parser } from "./parser";
import { codegen } from "./codegen";

export function compiler(code: string) {
  let tokens = tokenizer(code);
  let ast = parser(tokens);
  let transformedAst = transformer(ast);
  return codegen(transformedAst);
}
