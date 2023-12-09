class DatabaseConnection {
  constructor(dbName, serverUri, username, password, isObjectDb = true) {
    this.isObjectDb = isObjectDb;
    this.dbName = dbName;
    this.serverUri = serverUri;
    this.username = username;
    this.password = password;
  }

  async open() {
    if (this.isObjectDb === true) {
      console.log("Starting connction to NoSQL database");
      const mongoose = require("mongoose");

      try {
        const connectionOptions = {
          dbName: this.dbName,
          user: this.username,
          pass: this.password,
        };

        await mongoose.connect(this.serverUri, connectionOptions);
      } catch (e) {
        console.log(
          " Error occured when connecting Application to the MongoDB Server\n Error \n" +
            e
        );
      }
    } else {
      console.log("Connection to SLQ database");
      console.error("Can't connect to database because, Nothing Implemented");
    }
  }

  async close() {
    if (this.isObjectDb === true) {
      try {
        await this.connection.close();
      } catch (e) {
        console.log(" Error occured While closing database Connexion \n" + e);
      }
    } else {
      console.log("Closing Connexion to SQL Database");
      console.error("Can't Close SQL Database Connection");
    }
  }
}

module.exports = { DatabaseConnection };
