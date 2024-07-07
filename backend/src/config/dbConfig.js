const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "your_todo_app",
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
