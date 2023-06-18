const hume = require("../utils/hume");
const openai = require("../utils/openai");
const multer = require("multer");

const { MulterAzureStorage } = require("multer-azure-blob-storage");

const azureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  containerAccessLevel: "blob",
});

const upload = multer({
  storage: azureStorage,
});

const uploadAudio = upload.single("audio");

const handleFiles = async (req, res, next) => {
  console.log(req.file);
  res.send("hello");
};

const submitAudio = async (req, res, next) => {
  hume
    .start_job(
      `{"models":{"face":{"fps_pred":3,"prob_threshold":0.99,"identify_faces":false,"min_face_size":60,"save_faces":false},"prosody":{"granularity":"utterance","identify_speakers":false,"window":{"length":4,"step":1}},"language":{"granularity":"word","identify_speakers":false},"ner":{"identify_speakers":false}},"transcription":{"language":null},"urls":${req.body.urls}],"notify":false}`,
      {
        "content-type": "application/json; charset=utf-8",
      }
    )
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
};

// PASS IN REQ.BODY.ID as the request id
const getPredictions = async (req, res, next) => {
  hume
    .get_job_predictions({
      id: req.body.job_id,
      accept: "application/json; charset=utf-8",
    })
    .then(({ data }) => {
      // collect data from script

      const requestData = JSON.stringify({
        data: data,
        models: {
          language: {
            granularity: "passage",
          },
        },
      });

      res.send(requestData);
    })
    .catch((err) => console.error(err));
};

// TAKES IN emotions: [{name_of_emotion: scale}, ...] and a text file,
// Submits that to GBT
const combinePredictions = async (req, res, next) => {
  const prompt = `Hello. Provided this text message about what I did today, and a list of emotions with a score of 0 to 1, where 0 means the emotion was not detected, and 1 means the emotion was highly detected, 
  please return the top 3 activities you believe are tied to this text message, and for each activity which is described using 4-6 words,
  the top three emotions tied to the activity with the corresponding percentages of how prevalent that emotion was,
  such that the three percentages are normalized to add up to 100%. Here is the following text message: ${req.body.thought}, and here is the list of emotions: ${req.body.emotions}. Provide this to me in the format of a JSON object, with absolutely no other text provided. I want the JSON object as a list of activities, with the title activity, and where each activity then has two attributes, description, and emotions. Title them exactly like this.`;
  const chatGBTresults = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });
  const activities = chatGBTresults.data.choices[0].message.content;
  res.send(activities);
};

const giveRecommendations = async (req, res, next) => {
  const prompt = `Hello. Provided this text message about what I did today, and a list of emotions with a score of 0 to 1, give me 5 actionable suggestions for what I can do to improve my well being. 
  Also give me a brief summary analysis of what I've been doing and how it's making me feel. Give this to me in the format of a JSON object with the following attributes: suggestions, which is a list of these five suggestions, and summary. 
  For each suggestion, give it to me in the format of just one attribute, and rank the attributes in terms of their importance.`;
  const chatGBTresults = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });
};

module.exports = {
  uploadAudio,
  handleFiles,
  submitAudio,
  getPredictions,
  combinePredictions,
  giveRecommendations,
};
