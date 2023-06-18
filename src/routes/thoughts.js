const thoughts = require("../controllers/thoughts");

const express = require("express");
const router = express.Router();

router.get("/", thoughts.get);
router.post("/", thoughts.post);
// router.patch("/:id", thoughts.patch);
// router.delete("/:id", thoughts.delete);

module.exports = router;
