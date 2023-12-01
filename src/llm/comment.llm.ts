import { CodeSnippet } from '../types'
import { askGPT3dot5 } from './gpt'

const DUMMY_COMMENT = `/**
* Generates a random value between 1 and 10.
*
* @returns {number} The randomly generated value.
*/`

const generatePrompt = (code: string): string => {
  return (
    'Return a Comment in JSDOC Format for the following code: `' + code + '`'
  )
}

const parseComment = (comment: string) => {
  return '\n' + comment + '\n\n'
}

// Exported Functions

export const getCommentFromCode = async (code: string): Promise<string> => {
  // return parseComment(DUMMY_COMMENT)
  return askGPT3dot5(generatePrompt(code)).then((comm) => parseComment(comm))
}

// Modifies the original snippets array and resolves comments for snippet who don't have comment property
export const bulkCommentsFromSnippets = async (
  snippets: CodeSnippet[],
): Promise<CodeSnippet[]> => {
  const promises: Promise<CodeSnippet>[] = []
  snippets.forEach((snippet) => {
    if (snippet.comment) {
      return snippet
    }

    const fun = async (): Promise<CodeSnippet> => {
      snippet.comment = await getCommentFromCode(snippet.code)
      return snippet
    }

    promises.push(fun())
  })

  return Promise.all(promises)
}
