const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello World!");
});

router.use("/users", require("./users"));

module.exports = router;
