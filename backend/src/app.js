const express = require("express");
require("express-async-errors");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const { join } = require("path");
const { handleError } = require("./utils/handleError.js");
const { logger } = require("./utils/logger.js");
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
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.use("/", homeRouter);
app.use("/tasks", tasksRouter);

const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

const logFile = join(__dirname, "..", "logs", "error.log");

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: logFile,
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);

app.use(handleError);

module.exports = {
  app,
};
