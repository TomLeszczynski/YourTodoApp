const { v4: uuid } = require("uuid");
const { TaskRecord } = require("../src/services/records/task.record");
const {
  TaskRepository,
} = require("../src/services/repositories/task.repository");

test("Check out is the getAll method from TaskRepository returns an array", async () => {
  const allTasks = await TaskRepository.getAll();
  expect(Array.isArray(allTasks)).toBeTruthy();
});

test("Insert task record to database and return the added task record", async () => {
  const id = uuid();
  const record = {
    id,
    task: "Buy coffee",
  };

  const task = new TaskRecord(record);
  const newTask = await TaskRepository.insert(task);

  expect(newTask).toHaveProperty("id", id);
  expect(newTask).toHaveProperty("task", "Buy coffee");
  expect(newTask).toHaveProperty("isDone", false);
});
