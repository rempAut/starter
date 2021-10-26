// Implementation of A lexer for IEC 61131-3 Structured text grammar
import { createToken, Lexer, TokenType } from 'chevrotain';

// the vocabulary will be exported and used in the Parser definition.
export const tokenVocabulary: { [x: string]: chevrotain.TokenType; } = {}

// specify tokens
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_][\.\w\d_]*/ });
const Assignment = createToken({ name: "Assignment", pattern: /:=/});
const Semicolon = createToken({ name: "Semicolon", pattern: /;+/});
const Float = createToken({ name: "Float", pattern: /\d+\.\d+/ });
const Integer = createToken({ name: "Integer", pattern: /\d+/, longer_alt: Float });

// skipped token
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
})

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
let allTokens = [
  WhiteSpace,
  Assignment,
  Semicolon,
  // "keywords" appear before the Identifier
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
]

const SelectLexer = new Lexer(allTokens)


allTokens.forEach((tokenType) => {
  tokenVocabulary[tokenType.name] = tokenType
})


export function lex(inputText: string) {

  console.log("lexing: =====> \n "+inputText)
  const lexingResult = SelectLexer.tokenize(inputText)

  if (lexingResult.errors.length > 0) {
    throw Error("Sad Sad Panda, lexing errors detected")
  }

  return lexingResult
}