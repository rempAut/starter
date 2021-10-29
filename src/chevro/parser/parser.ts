import { tokenVocabulary, lex } from '../lexer/lexer';
import { CstNode, CstParser } from 'chevrotain';


class stParser extends CstParser {

  // typescript trickery
    assign!: (idx: number) => CstNode;
    value!: (idx: number) => CstNode;

    constructor() {
        super(tokenVocabulary, {
          recoveryEnabled: true
        })
  
        // for conciseness
        const $ = this;
  
        $.RULE("testRule", () => {
           $.OR([
            {ALT: () => $.SUBRULE($.assign)}
          ]);
        });
        
        $.RULE("assign", () => {
          $.CONSUME(tokenVocabulary.Identifier)
          $.CONSUME(tokenVocabulary.Assignment)
          $.SUBRULE($.value)  
        });
        
         $.RULE("value", () => {
          $.OR([
            {ALT: () => $.CONSUME(tokenVocabulary.Identifier)},
            {ALT: () => $.CONSUME(tokenVocabulary.Integer)},
          ]);
          $.CONSUME(tokenVocabulary.Semicolon)
        });
  
  
        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis();
      }
}

const parserInstance = new stParser();

function parse(inputText: string) {

  const lexResult = lex(inputText)

  // ".input" is a setter which will reset the parser's internal's state.
  parserInstance.input = lexResult.tokens

  // No semantic actions so this won't return anything yet.
  // @ts-ignore
  const cstOutput = parserInstance.testRule()
  console.log("hello from parser!")

  if (parserInstance.errors.length > 0) {
    throw Error(
      "Sad sad panda, parsing errors detected!\n" +
        parserInstance.errors[0].message
    )
  }
  return cstOutput;
}

export { parserInstance, parse, stParser }