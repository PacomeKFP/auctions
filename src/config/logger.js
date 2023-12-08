const winston = require("winston");
/**
 * Creates a logger for the application and make few adjustements
 * based on the environement the app is running on
 */
const createLogger = (
  loggerService = "server.main",
  filePath = "./logs/combined.log",
  errorFilePath = "./logs/error.log"
) => {
  const _loggerLevel =
    process.env?.ENVIRONMENT === "production" ? "info" : "debug";
  const { combine, timestamp, printf } = winston.format;

  const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  const logger = winston.createLogger({
    level: _loggerLevel,
    format: combine(timestamp(), customFormat),
    defaultMeta: { service: loggerService },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: errorFilePath,
        level: "error",
      }),
      new winston.transports.File({ filename: filePath }),
    ],
  });

  // setup a console logger if we are in development
  if (process.env?.ENVIRONMENT === "development")
    logger.add(
      new winston.transports.Console({ format: winston.format.simple() })
    );

  return logger;
};

module.exports = { createLogger };
