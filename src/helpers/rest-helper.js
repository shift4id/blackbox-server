const prisma = require("../utils/prisma");

const express = require("express");
const router = express.Router();

router.get("/:id", function (req, res, next) {
  prisma.post.findUnique({ where: { id: req.params.id } });
});

router.post("/", function (req, res, next) {
  prisma.post.create({ data: req.body });
});

router.patch("/:id", function (req, res, next) {
  prisma.post.update({ where: { id: req.params.id }, data: req.body });
});

router.delete("/:id", function (req, res, next) {
  prisma.post.delete({ where: { id: req.params.id } });
});

const construcRestHandlers = (schemaName) => {
  return {
    get: (req, res) => {
      prisma.user.findUnique({
        where: {
          id: 1,
        },
      });
    },
    post: (req, res) => {
      prisma.user.create({
        data: {},
      });
    },
    put: (req, res) => {
      res.send(`PUT ${schemaName}`);
    },
    delete: (req, res) => {
      res.send(`DELETE ${schemaName}`);
    },
  };
};
