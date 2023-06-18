const restHelper = require("../helpers/rest-helper");
const { user } = require("../utils/prisma");

module.exports = restHelper(user)
