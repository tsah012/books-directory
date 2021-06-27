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




server.get("/", isLogged, async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/home/index.html'));
});

server.get("/login", isNotLogged, async function (req, res){
    res.sendFile(path.join(__dirname, 'client/pages/login/index.html'));
});

server.get("/logout", isLogged, async function (req, res){
    res.clearCookie('Logged');
    res.redirect('/login');
});

server.get("/register", isNotLogged, async function (req, res){
    res.sendFile(path.join(__dirname, 'client/pages/register/index.html'));
});



function isLogged(req, res, next) {
    if (req.cookies.Logged) {
        return next();
    }

    res.redirect('/login');
}

function isNotLogged(req, res, next){
    if (!req.cookies.Logged){
        return next();
    }

    res.redirect('/');
}




// Initialize connection with db and keep it opened
mongodb.connect(config.dbConnectionString + config.dbName, function (err, database) {
    if (err) throw err;

    // Save reference to db connection for DAL use
    server.locals.db = database.db();
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});



