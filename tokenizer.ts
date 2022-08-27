export enum TokenTypes {
  Paren,
  Name,
  Number,
}

interface Token {
  type: TokenTypes;
  value: string;
}
export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  while (current < code.length) {
    let char = code[current];
    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    // 处理name
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }
    // 处理number
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
    // 处理空格
    let SPACES = /\s/;
    if (SPACES.test(char)) {
      current++;
      continue;
    }
  }
  return tokens;
}
