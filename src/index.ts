import { helloWorld } from './app/HelloWorld';
import { parse } from './pretty/parser';


console.log(helloWorld());


const inputText = "myVar1 :=   myValue2;"
// this is new
const parsingResult = parse(inputText)
console.log(JSON.stringify(parsingResult,null, "\t"))
