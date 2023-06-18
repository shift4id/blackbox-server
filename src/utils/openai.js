const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai;
