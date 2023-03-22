// netlify-functions/generate-response.js
const { createClient } = require('openai');

const openai = createClient({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const message = data.message;

  try {
    const response = await openai.Completion.create({
      engine: 'davinci-codex',
      prompt: `I am a workout chatbot. ${message}`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    if (response.choices && response.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ response: response.choices[0].text.trim() }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ response: 'I am not sure how to respond to that.' }) };
  } catch (error) {
    console.error('Error generating response:', error);
    return { statusCode: 500, body: 'An error occurred while generating a response.' };
  }
};
