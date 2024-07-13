const { createLogger, transports, format } = require("winston");
const { join } = require("path");

const logFile = join(__dirname, "..", "..", "logs", "app.log");

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: logFile,
    }),
  ],
  format: format.combine(format.timestamp(), format.json()),
});

module.exports = {
  logger,
};
