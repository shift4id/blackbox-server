const express = require("express");
const router = express.Router();
const spheresRouter = require("./spheres");

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/spheres", spheresRouter);

module.exports = router;
