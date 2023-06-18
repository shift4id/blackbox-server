const express = require("express");
const router = express.Router();
const restHelper = require("../helpers/rest-helper");
const { sphere } = require("@prisma/client");


const spheresRouter = require("./spheres");
const thoughtsRouter = require("./thoughts");

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/spheres", spheresRouter);
router.use("/thoughts", thoughtsRouter);

module.exports = router;
