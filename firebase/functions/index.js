const cors = require('cors');
const functions = require('firebase-functions');
const { Configuration, OpenAIApi } = require('openai');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const corsHandler = cors({
  origin: 'https://fitbotics.netlify.app',
  methods: ['POST'],
});

// netlify-functions/generate-response.js
const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.chat = functions.https.onRequest((request, response) =>
  corsHandler(request, response, async () => {
    const { prompt } = request.body;
    functions.logger.info(prompt, { structuredData: true });

    try {
      const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0.5,
        prompt: prompt,
        max_tokens: 2000,
      });
      functions.logger.info(data.choices, { structuredData: true });
      if (data.choices && data.choices.length > 0) {
        return response.send(data.choices[0]);
      } else {
        return response.status(500).send('The prompt did not have a response');
      }
    } catch (error) {
      functions.logger.error('Error generating response:', error);
      return response
        .status(500)
        .send('An error occurred while generating a response.');
    }
  }),
);
