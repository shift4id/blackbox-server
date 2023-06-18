const restHelper = require("../helpers/rest-helper");
const { sphere } = require("@prisma/client");

module.exports = restHelper(sphere)
