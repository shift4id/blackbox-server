const restHelper = require("../helpers/rest-helper");
const { thoughts } = require("@prisma/client");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
 });
const openai = new OpenAIApi(configuration);

async function testing() {
    const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
    });
    console.log(completion.data.choices[0].message);
}



module.exports.testing = testing;
module.exports = restHelper(thoughts);


