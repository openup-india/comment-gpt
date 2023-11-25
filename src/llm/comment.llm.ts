const { askGPT3dot5 } = require('./gpt')

const generatePrompt = (code: string): string => {
  return (
    'Return a Comment in JSDOC Format for the following code: `' + code + '`'
  )
}

// Exported Functions

exports.getCommentFromCode = (code: string): string => {
  return askGPT3dot5(generatePrompt(code))
}
