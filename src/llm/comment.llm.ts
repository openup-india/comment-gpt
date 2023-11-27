import { askGPT3dot5 } from './gpt'

const generatePrompt = (code: string): string => {
  return (
    'Return a Comment in JSDOC Format for the following code: `' + code + '`'
  )
}

// Exported Functions

export const getCommentFromCode = async (code: string): Promise<string> => {
  return askGPT3dot5(generatePrompt(code))
}
