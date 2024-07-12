const express = require("express");
const { homeController } = require("../../controllers/home.js");

const homeRouter = express.Router();

homeRouter.get("/", homeController);

module.exports = {
  homeRouter,
};
