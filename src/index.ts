import { helloWorld } from './app/HelloWorld';
import { lex } from './chevro/lexer/lexer';


console.log(helloWorld());


const inputText = "SELECT column1 FROM table2"
const lexingResult = lex(inputText)
console.log(JSON.stringify(lexingResult, null, "\t"))
