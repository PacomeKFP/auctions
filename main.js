// Global configs
require("dotenv").config();
const { createLogger } = require("./src/config/logger");

const logger = createLogger();

// imports
const { HttpServer } = require("./src/app/http/httpServer");
const {
  DatabaseConnection,
} = require("./src/infrastructure/database/DatabaseConnection");

// Connect to database
const { ENVIRONMENT, DB_NAME, MONGO_DB_URI, USERNAME, PASSWORD } = process.env;

const databaseConnection =
  ENVIRONMENT === "production"
    ? new DatabaseConnection(DB_NAME, MONGO_DB_URI, USERNAME, PASSWORD)
    : new DatabaseConnection(DB_NAME, MONGO_DB_URI, null, null);
databaseConnection.open().then(() => {
  logger.log("info", "Database Connection OK");
});

// configuration for express HTTP server
const { SERVER_PORT, APP_ROUTE_PREFIX } = process.env;
const httpServer = new HttpServer(APP_ROUTE_PREFIX, SERVER_PORT);

httpServer.launchServer(); // launching the server

//configuration for WebSocket server
