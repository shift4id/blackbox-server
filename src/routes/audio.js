const audio = require("../controllers/audio");

const express = require("express");
const router = express.Router();

router.post("/", audio.postMessage);
router.get("/", audio.getPredictions);
router.get("/combine", audio.combinePredictions)
router.get("/suggest", audio.giveRecommendations)

module.exports = router;
