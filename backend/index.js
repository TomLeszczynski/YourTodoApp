const { log } = require("winston");
const { app } = require("./src/app.js");
const { createTasksTable } = require("./migrations/create_tasks_table.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", async () => {
  console.log(`Server running on port ${PORT}`);
  await createTasksTable();
});
