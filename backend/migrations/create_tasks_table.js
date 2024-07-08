const { app } = require("../src/app");
const { pool } = require("../src/config/dbConfig");

const createTasksTable = async () => {
  try {
    const sql = `
            CREATE TABLE IF NOT EXISTS tasks (
                id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
                task VARCHAR(255) NOT NULL,
                isDone TINYINT(1) NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
             );`;

    const [results] = await pool.execute(sql);
    console.log("Tasks table successfully created or already exists");
  } catch (error) {
    throw new Error(
      "Error creating tasks table. Please, checkout your database connection.",
      error
    );
  }
};

module.exports = {
  createTasksTable,
};
