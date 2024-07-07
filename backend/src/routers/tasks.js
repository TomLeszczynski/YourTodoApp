const express = require("express");
const { log } = require("winston");
const { TaskRepository } = require("../services/repositories/task.repository");
const { TaskRecord } = require("../services/records/task.record");

const tasksRouter = express.Router();

const data = [
  {
    task: "Zjeść kokosanke",
    id: "bsib4ihbs",
    isDone: false,
  },
  {
    task: "Zrobić wino",
    id: "dfhgib345",
    isDone: false,
  },
  {
    task: "Kupić kapary",
    id: "zfjfhgu8hug43",
    isDone: false,
  },
  {
    task: "Napić się ginu",
    id: "ghbuhwergty485",
    isDone: false,
  },
];

tasksRouter
  .get("/", async (req, res) => {
    const allTasks = await TaskRepository.getAll();
    res.json(allTasks);
  })
  .post("/", async (req, res) => {
    const tasksList = req.body;
    res.status(201).json(tasksList);
  })
  .patch("/:id/isDone", async (req, res) => {
    const { id } = req.params;
    const {} = req.body;
    res.json({ sample: `work on ${req.method} ${req.baseUrl}`, id: `${id}` });
  })
  .patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    res.json(task);
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json({ sample: `work on ${req.method} ${req.baseUrl}`, id: `${id}` });
  });

module.exports = {
  tasksRouter,
};
