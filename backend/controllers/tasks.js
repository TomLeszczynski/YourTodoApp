const { v4: uuid } = require("uuid");
const { TaskRecord } = require("../src/services/records/task.record.js");
const {
  TaskRepository,
} = require("../src/services/repositories/task.repository.js");
const { NotFoundError } = require("../src/utils/handleError.js");

async function getTaskOrFail(id) {
  const taskRecord = await TaskRepository.getOne(id);
  if (!taskRecord) {
    throw new NotFoundError(`Can not find a task with id: ${id} in database.`);
  }
  return taskRecord;
}

const getAllTasks = async (req, res) => {
  const data = await TaskRepository.getAll();
  res.json(data);
};

const createTask = async (req, res) => {
  const id = uuid();
  const { task } = req.body;
  const newTaskRecord = new TaskRecord({ id, task, isDone: false });
  const data = await TaskRepository.insert(newTaskRecord);
  res.status(201).json(data);
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskRecord = await getTaskOrFail(id);
    const data = await TaskRepository.changeStatusToDone(taskRecord);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const updateContentOfTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const taskRecord = await getTaskOrFail(id);
    const updatedTaskRecord = new TaskRecord({ ...taskRecord, task });
    const data = await TaskRepository.updateTask(updatedTaskRecord);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskRecord = await getTaskOrFail(id);
    const data = await TaskRepository.delete(taskRecord);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateContentOfTask,
  deleteTask,
};
