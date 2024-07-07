const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.redirect(303, "/tasks");
});

module.exports = {
  homeRouter,
};
