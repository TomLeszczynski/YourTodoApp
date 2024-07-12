const express = require("express");
const tasksController = require("../../controllers/tasks.js");

const tasksRouter = express.Router();

tasksRouter
  .get("/", tasksController.getAllTasks)
  .post("/", tasksController.createTask)
  .patch("/:id/isDone", tasksController.updateTaskStatus)
  .patch("/:id", tasksController.updateContentOfTask)
  .delete("/:id", tasksController.deleteTask);

module.exports = {
  tasksRouter,
};