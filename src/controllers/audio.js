const sdk = require("api")("@hume/v0#55738li58u312");

const submitAudio = async (req, res, next) => {
  sdk.auth(process.env.HUME_API_KEY);
  sdk
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
  sdk.auth(process.env.HUME_API_KEY);
  sdk
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
      const parsedData = JSON.parse(requestData);
      // const t = requestData.language.predictions;
      // res.send(parsedData)
      res.send(requestData);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  submitAudio,
  getPredictions,
};
