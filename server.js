const config = require("./configuration_settings")
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');


const server = express();
server.use(express.static(path.join(__dirname, 'public')));

// Initialize connection with db and keep it opened
mongodb.connect(config.dbConnectionString + config.dbName, function (err, database) {
    if (err) throw err;

    // Save reference to db connection for DAL use
    server.locals.db = database;
    server.listen(config.port, function () {
        console.log("listening on port", config.port)
    });
});



