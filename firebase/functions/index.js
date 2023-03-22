
const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// netlify-functions/generate-response.js
const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.chat = functions.https.onRequest( async (request, response) => {
  if (request.httpMethod !== "POST") {
    return response.send({statusCode: 405, body: "Method Not Allowed"});
  }
  const {prompt} = JSON.parse(request.body);
  try {
    const {data} = await openai.createCompletion(
        {
          "model": "code-davinci-002",
          "prompt": prompt,
          "max_tokens": 500,
          "n": 1,
        });
    functions.logger.info(data, {structuredData: true});
    if (data.choices && data.choices.length > 0) {
      return response.send({
        statusCode: 200,
        body: data.choices[0].text.trim(),
      });
    }
  } catch (error) {
    functions.logger.error("Error generating response:", error);
    return response.send({
      statusCode: 500,
      body: "An error occurred while generating a response.",
    });
  } finally {
    response.send({
      statusCode: 500,
      body: "An error occurred while generating a response."});
  }
});
