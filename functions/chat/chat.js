// netlify-functions/generate-response.js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const prompt = data.prompt

  try {
    const {data}= await openai.createCompletion(

      {
        "model": "text-davinci-002",
        prompt,
        max_tokens: 500,
    n: 1,
    stop: null,
      })



console.log(data)
    if (data.choices && data.choices.length > 0) {
      return {
        statusCode: 200,
        body: data.choices[0].text.trim()
      };
    }

    return { statusCode: 200, body: JSON.stringify({ response: 'I am not sure how to respond to that.' }) };
  } catch (error) {
    console.error('Error generating response:', error);
    return { statusCode: 500, body: 'An error occurred while generating a response.' };
  }
};
