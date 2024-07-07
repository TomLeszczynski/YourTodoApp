const express = require("express");
require("express-async-errors");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
// const { handleError } = require("./utils/handleError.js");
// const { logger } = require("./utils/logger.js");
const { homeRouter } = require("./routers/home.js");
const { tasksRouter } = require("./routers/tasks.js");

const app = express();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  limit: 600,
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(limiter);
// app.use((err, req, res, next) => {
//   logger.info(`${req.method} ${req.url}`);
//   next();
// });

app.use("/", homeRouter);
app.use("/tasks", tasksRouter);

// app.use(handleError);

module.exports = {
  app,
};
