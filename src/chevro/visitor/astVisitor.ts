import { parse, stParser } from '../parser/parser'
import { lex } from '../lexer/lexer';

// A new parser instance with CST output (enabled by default).
const parserInstance = new stParser()

// The base visitor class can be accessed via the a parser instance.
const BaseStVisitor = parserInstance.getBaseCstVisitorConstructor()
// This BaseVisitor include default visit methods that simply traverse the CST.
const BaseStVisitorWithDefaults = parserInstance.getBaseCstVisitorConstructorWithDefaults()


class myStToAstVisitor extends BaseStVisitor {
    constructor() {
        super()
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        this.validateVisitor()
    }

    /* Visit methods go here */
}

class myStToAstVisitorWithDefaults extends BaseStVisitorWithDefaults {
    constructor() {
        super()
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        //@ts-ignore
        this.result = []
        this.validateVisitor()
    }

    /* Visit methods go here */
}

// Our visitor has no state, so a single instance is sufficient.
const toAstVisitorInstance = new myStToAstVisitorWithDefaults()

function toAst(inputText: string) {

    const lexResult = lex(inputText)

    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = lexResult.tokens
    // @ts-ignore
    const cstOutput = parserInstance.testRule()

    if (parserInstance.errors.length > 0) {
        throw Error(
            "Sad sad panda, parsing errors detected!\n" +
            parserInstance.errors[0].message
        )
    }

    const ast = toAstVisitorInstance.visit(cstOutput)
    return ast

}

export { toAst }