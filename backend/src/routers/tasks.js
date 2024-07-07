const express = require("express");
const { log } = require("winston");

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
  .get("/", (req, res) => {
    res.json(data);
  })
  .post("/", (req, res) => {
    const tasksList = req.body;
    res.status(201).json(tasksList);
  })
  .patch("/:id/isDone", (req, res) => {
    const { id } = req.params;
    const {} = req.body;
    res.json({ sample: `work on ${req.method} ${req.baseUrl}`, id: `${id}` });
  })
  .patch("/:id", (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    res.json(task);
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ sample: `work on ${req.method} ${req.baseUrl}`, id: `${id}` });
  });

module.exports = {
  tasksRouter,
};
