const OPENAI = require("openai");
const { OPENAI_API_KEY } = require("../config");

const MAX_TOKEN_LIMIT = 1000;

const openai = new OPENAI({
  apiKey: OPENAI_API_KEY,
});

exports.askGPT3dot5 = async (prompt: string, system = "You are an Assistant.") => {
  return "Test Response";
  console.debug(prompt);

  try {
    // const res = await api.sendMessage(prompt);
    const gptResponse = await openai.chat.completions.create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      // model: "gpt-4-1106-preview", // Todo: Add Function Calling to Return JSON https://medium.com/@simon.farshid/native-json-output-from-gpt-4-45881dc91897
      model: "gpt-3.5-turbo",
    });

    console.log("Prompt: " + prompt, gptResponse.data);

    return gptResponse?.choices[0]?.message?.content;
  } catch (error) {
    console.error(error);
  }
};