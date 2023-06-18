const sdk = require("api")("@hume/v0#55738li58u312");

sdk.auth(process.env.HUME_API_KEY);

module.exports = sdk;
