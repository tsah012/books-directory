const config = require("./configuration_settings")
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const express = require('express');
const appRouter = require("./custom_modules/appRouter")

const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded());
server.use(express.json());
server.use('/api', appRouter);

// Initialize connection with db and keep it opened
mongodb.connect(config.dbConnectionString + config.dbName, function (err, database) {
    if (err) throw err;

    // Save reference to db connection for DAL use
    server.locals.db = database.db();
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});



