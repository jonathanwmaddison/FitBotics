
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
  response.set("Access-Control-Allow-Origin", "https://fitbotics.netlify.app");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST");
    // response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  }

  // if (request.httpMethod !== "POST") {
  //   return response.send({statusCode: 405, body: "Method Not Allowed"});
  // }
  functions.logger.info(request.body, {structuredData: true});

  const prompt = request.body;
  try {
    const {data} = await openai.createChatCompletion(
        {
          "model": "gpt-3.5-turbo",
          "messages": [
            {"role": "user", "content": prompt },
          ],
          "max_tokens": 500,
        });
    functions.logger.info(data, {structuredData: true});
    if (data.choices && data.choices.length > 0) {
      return response.send({
        statusCode: 200,
        body: data.choices[0].messsage.content.trim(),
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
      body: "The prompt did not have a response"});
  }
});
