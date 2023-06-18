const e = require("express");
const hume = require("../utils/hume");
const openai = require("../utils/openai");

const EMOTIONS = [
  "Calmness",
  "Disappointment",
  "Happiness",
  "Shame",
  "Tiredness",
  "Accomplishment",
  "Love",
  "Stress",
  "Determination",
  "Fear",
];

const CATEGORIES = ["Gym", "Academics", "Friends", "Family", "Math"]

const submitToHume = async (urls) => {
  console.log("Submitting to Hume")
  console.log("URLS:", urls)
  const data = await hume.start_job(JSON.stringify({"models":{"face":{"fps_pred":3,"prob_threshold":0.99,"identify_faces":false,"min_face_size":60,"save_faces":false},"prosody":{"granularity":"utterance","identify_speakers":false,"window":{"length":4,"step":1}},"language":{"granularity":"word","identify_speakers":false},"ner":{"identify_speakers":false}},"transcription":{"language":null},"urls": urls,"notify":false}), {
  'content-type': 'application/json; charset=utf-8'
})
  .then(({ data }) => data)
  .catch(err => console.error(err));
  return data;
};

const receiveFromHume = async (job_id) => {
  const emotions = await hume
    .get_job_predictions({
      id: job_id,
      accept: "application/json; charset=utf-8",
    })
    .then(({ data }) => {
      console.log("Hume Data from Job Prediction:", data)
      return data
    })
    .catch((error) => console.error(error));
    return emotions;
};

const processHumeEmotions = (data) => {
  console.log(data[0].results.predictions[0].models.language)
  const emotions =
    data[0].results.predictions[0].models.language.grouped_predictions[0].predictions.map(
      (pred) => pred.emotions
  );
  const map = {};
  emotions.forEach((e) => {
    e.forEach((emotion) => {
      if (emotion.name != map) map[emotion.name] = emotion.score;
      else map[emotion.name] += emotion.score;
    });
  });
  return map;
}

const processHumeText = (data) => {
  const text =
    data[0].results.predictions[0].models.language.grouped_predictions[0].predictions
      .map((pred) => pred.text)
      .join(" ");
  
  return text;
};

const thoughtToSpheres = async (text) => {
  const prompt = `Hello. Provided this text message about what I did today, and the given life spheres that my life revolves around,
  return the top 3 or fewer categories that you believe show up in this message from the provided list of categories. Here is the text message: ${text}. Here is the list of categories: ${CATEGORIES}. 
  Return this in the format of a list where each element is only the name of the category. Do not return any other text.`;

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });
  console.log("ChatGPT data:", chatGPT.data)
  return chatGPT.data.choices[0].message.content;
};

const thoughtToEmotions = async (text, textEmotions) => {
  const prompt = `Hello. Provided this text message about what I did today, and a list of emotions related to that message with a score of 0 to 1, where 0 means the emotion was not detected, and 1 means the emotion was highly detected, 
  and a list of the 10 emotions I want to consider, return a list of these 10 emotions mapped to the percentage of how prevalent that emotion is, 
  such that the 10 percentages are normalized to add up to 1. (Return the percentages as decimals). Here is the following text message: ${text} and the list of emotions relevant to that message: ${textEmotions}, and the 10 emotions I want to consider: ${EMOTIONS}.
  Return this to me as a JSON object of a list where each of the ten emotions from the ones I provided you are a mapped to the corresponding percentage such that each element of the list 
  has two attributes, emotion, and percentage. Return the JSON object to me without any other text without any newlines.`;
  const chatGPT = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });

  const emotions = chatGPT.data.choices[0].message.content;
  return emotions;
};

const combinePredictions = async (emotions, text) => {
  const prompt = `Hello. Provided this text message about what I did today, and a list of emotions with a score of 0 to 1, where 0 means the emotion was not detected, and 1 means the emotion was highly detected, 
  please return the top 3 activities you believe are tied to this text message, and for each activity which is described using 4-6 words,
  the top three emotions tied to the activity with the corresponding percentages of how prevalent that emotion was,
  such that the three percentages are normalized to add up to 100%. Here is the following text message: ${text}, and here is the list of emotions: ${emotions}. Provide this to me in the format of a JSON object, with absolutely no other text provided. I want the JSON object as a list of activities, with the title activity, and where each activity then has two attributes, description, and emotions. Title them exactly like this.`;
  const chatGPT = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });
  const activities = chatGPT.data.choices[0].message.content;
  return activities;
};

const getPredictions = async (req, res, next) => {
  res.send("hello world")
}

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

// TODO: CHANGE TO ASYNC
const processAudio = (url) => {
  return "Today I started off my morning by going on a hike with my friend Ben. I was really excited to see him, but then he started talking about how he was in love with my roommate and it made me feel really bad, so then I left the hike feeling pretty poorly. Then I went to the gym, and that made me feel better. The gym makes me feel alive and excited, and I made a personal record today! I then met with my friend Dhruv, and he wasn't very nice to me. I'm a shy person so I don't know how to deal with mean people, and so I ended up just bawling my eyes out. I'm so sad. I don't know what to do with my life anymore!"
}

const postMessage = async (req, res, next) => {
  // send message to hume
  // await response from hume
  // upon response, execute all the gpt commands
  console.log("URLS:", req.body.urls)
  const job = await submitToHume(req.body.urls);
  console.log("after submitting to hume", job)
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const dummy_id = "a63c09d2-bd84-443b-8df1-a0fa33d46f96"
  const hume_data = await receiveFromHume(dummy_id);
  var emotions = processHumeEmotions(hume_data);
  var text = {}
  // change this  
  if (req.body.isText) {
    text = processHumeText(hume_data);
  } else 
  {
    text = processAudio(req.body.urls);
  }
  
  const spheres = await thoughtToSpheres(text)
  const emotionsRanking = await thoughtToEmotions(text)
  res.send({"spheres": spheres, "emotionsRanking": emotionsRanking})  
};

module.exports = {
  submitToHume,
  getPredictions,
  postMessage,
  combinePredictions,
  giveRecommendations,
};
