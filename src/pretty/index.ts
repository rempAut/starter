import { parse } from "./parser"

const languages = [
    {
        extensions: ['.st'],
        name: 'Structured text',
        parsers: ['st-parse']
    }
]

const parsers = {
    'st-parse': {
        parse: (text: string) => parse(text),
        astFormat: 'st-cst'
    }
}


function printSt(path: any, options: any, print: any) {
    const node = path.getValue()
    console.log(node)

    if (Array.isArray(node)) {
        return (path.map(print))
    }

    switch (node.type) {
        default:
            return ''
    }
}


const printers = {
    'st-cst': {
        print: printSt
    }
}


export { languages, printers, parsers}