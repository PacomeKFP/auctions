// Global configs
require("dotenv").config();

// imports
const { HttpServer } = require("./src/app/http/httpServer");

// configuration for express HTTP server
const { SERVER_PORT, APP_ROUTE_PREFIX } = process.env;

const httpServer = new HttpServer(APP_ROUTE_PREFIX, SERVER_PORT);

httpServer.launchServer(); // launching the server

//configuration for WebSocket server
