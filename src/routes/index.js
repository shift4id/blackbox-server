const express = require("express");
const router = express.Router();

const spheresRouter = require("./spheres");
const thoughtsRouter = require("./thoughts");
const usersRouter = require("./users");
const audioRouter = require("./audio");
const audioController = require("../controllers/audio");

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/spheres", spheresRouter);
router.use("/thoughts", thoughtsRouter);
router.use("/users", usersRouter);
// router.post(
//   "/audio/upload",
//   audioController.uploadAudio,
//   audioController.handleFiles
// );
router.use("/audio", audioRouter);

module.exports = router;
