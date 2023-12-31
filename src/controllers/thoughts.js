const restHelper = require("../helpers/rest-helper");
const openai = require("../utils/openai");
const { thought } = require("../utils/prisma");

const getGBT = async (req, res, next) => {
  console.log("GET GBT!!");
  await openai
    .createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello world" },
      ],
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
};
// Audio transcription for chat gpt
const thoughtAudio = async (req, res, next) => {
  console.log("whispers.api");
  await openai
    .createChatCompletion({
      model: "whisper-1",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello world" },
      ],
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
};

// function restHelper(model) {
//   return {
//     get: getGBT
//   }
// }
// console.log(prisma.Thought)
module.exports = restHelper(thought);
