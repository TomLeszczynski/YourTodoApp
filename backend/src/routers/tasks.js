const express = require("express");
const { v4: uuid } = require("uuid");
const { log } = require("winston");
const { TaskRepository } = require("../services/repositories/task.repository");
const { TaskRecord } = require("../services/records/task.record");

const tasksRouter = express.Router();

tasksRouter
  .get("/", async (req, res) => {
    const data = await TaskRepository.getAll();
    res.json(data);
  })
  .post("/", async (req, res) => {
    const id = uuid();
    const { task } = req.body;
    const newTaskRecord = new TaskRecord({ id, task, isDone: false });
    const data = await TaskRepository.insert(newTaskRecord);
    res.status(201).json(data);
  })
  .patch("/:id/isDone", async (req, res) => {
    const { id } = req.params;
    const taskRecord = await TaskRepository.getOne(id);
    const data = await TaskRepository.changeStatusToDone(taskRecord);
    res.json(data);
  })
  .patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const taskRecord = await TaskRepository.getOne(id);
    const updatedTaskRecord = new TaskRecord({ ...taskRecord, task });
    const data = await TaskRepository.updateTask(updatedTaskRecord);
    res.json(data);
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const taskRecord = await TaskRepository.getOne(id);
    const data = await TaskRepository.delete(taskRecord);
    res.json(data);
  });

module.exports = {
  tasksRouter,
};