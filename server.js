const config = require("./configuration_settings");
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const appRouter = require("./custom_modules/appRouter");
const usersDAL = require('./custom_modules/DAL/users');

const server = express();

server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use(express.static(path.join(__dirname, 'client')));
server.use(express.urlencoded());
server.use(express.json());
server.use('/api', appRouter);




server.get("/", async function (req, res) {
    if (req.cookies.Logged){
        res.sendFile(path.join(__dirname, 'client/home/index.html'));
    }
    else {
        res.sendFile(path.join(__dirname, 'client/login/login.html'));
    }
});

// Initialize connection with db and keep it opened
mongodb.connect(config.dbConnectionString + config.dbName, function (err, database) {
    if (err) throw err;

    // Save reference to db connection for DAL use
    server.locals.db = database.db();
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});



