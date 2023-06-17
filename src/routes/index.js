var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello World!");
});

router.use("/users", require("./users"));

module.exports = router;
