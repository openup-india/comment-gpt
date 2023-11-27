import OpenAI from 'openai'
import Config from '../config'

const MAX_TOKEN_LIMIT = 1000

const openai = new OpenAI({
  apiKey: Config.OPENAI_API_KEY,
})

export const askGPT3dot5 = async (
  prompt: string,
  system = 'You are an Assistant.',
): Promise<string> => {
  //   return 'Test Response'
  console.debug(prompt)

  try {
    // const res = await api.sendMessage(prompt);
    const gptResponse = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
      // model: "gpt-4-1106-preview", // Todo: Add Function Calling to Return JSON https://medium.com/@simon.farshid/native-json-output-from-gpt-4-45881dc91897
      model: 'gpt-3.5-turbo',
      n: 1,
    })

    // console.log('Prompt: ' + prompt, gptResponse.data)

    if (gptResponse.choices.length >= 1) {
      return gptResponse.choices[0].message.content ?? '' // content can be null if only function calls are made
    } else {
      throw new Error('0 Choices generated')
    }
  } catch (error) {
    console.error(error)
  }

  return ''
}
