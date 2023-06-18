const audio = require("../controllers/audio");

const express = require("express");
const router = express.Router();

router.get("/", audio);

module.exports = router;
