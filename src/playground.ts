import { getCommentFromCode } from './llm/comment.llm'
import { jsparser } from './parser/javascript.parser'

const file = `
// function abc2(){
//     return "abc"
// }

let getRandomValue = () => {
    return Math.random() * 10 + 1;
}
`
const snippets = jsparser(file)

const main = async () => {
  for (let snippet of snippets) {
    console.log(await getCommentFromCode(snippet.code))
  }
}

main()
