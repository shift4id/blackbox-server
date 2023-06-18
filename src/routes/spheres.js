const spheres = require("../controllers/spheres");

const express = require("express");
const router = express.Router();


router.get("/:id", spheres.get);
router.post("/", spheres.post);
router.patch("/:id", spheres.patch);
router.delete("/:id", spheres.delete);

module.exports = router;
