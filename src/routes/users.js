const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({
    users: [
      { name: "John Doe", id: 0 },
      { name: "Jane Doe", id: 1 },
    ],
  });
});

module.exports = router;
