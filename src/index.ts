import { helloWorld } from './app/HelloWorld';
import { lex } from './chevro/lexer/lexer';
import { parse } from './chevro/parser/parser';


console.log(helloWorld());


const inputText = "myVar1 :=   myValue2;"
 
const parsingResult = parse(inputText)
