const express = require("express");
const router = express.Router();

const spheresRouter = require("./spheres");
const thoughtsRouter = require("./thoughts");
const audioRouter = require("./audio");

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/spheres", spheresRouter);
router.use("/thoughts", thoughtsRouter);
router.use("/audio", audioRouter);

module.exports = router;
