import { parse as stParse } from "../chevro/parser/parser";


function parse(text: string) {
    const cst = stParse(text);
    return cst;
}

export { parse }
