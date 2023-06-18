const users = require("../controllers/users");

const express = require("express");
const router = express.Router();

router.get("/:id", users.get);
router.post("/", users.post);
router.patch("/:id", users.patch);
router.delete("/:id", users.delete);

module.exports = router;
