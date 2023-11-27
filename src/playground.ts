import { jsparser } from './parser/javascript.parser'

const code = `
// function abc2(){
//     return "abc"
// }

let abc = () => {}
`
const result = jsparser(code)
console.debug(result)
