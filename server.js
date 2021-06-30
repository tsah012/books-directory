const config = require("./configuration_settings");
const passportConfiguration = require('./passport-config');
const usersRouter = require("./custom_modules/routers/users");
const booksRouter = require("./custom_modules/routers/books");
const usersDAL = require('./custom_modules/DAL/users');
const mongo = require('./mongo');

const path = require('path');
const mongodb = require('mongodb').MongoClient;
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');


const server = express();

const mongoSessionStore = new MongoDBStore({
    uri: config.dbConnectionString + config.dbName,
    collection: config.storeCollection
  });

server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use(express.static(path.join(__dirname, 'client')));
server.use(express.urlencoded());
server.use(express.json());
server.use(session({
    secret: config.secret,
    // resave = save session in case nothing is changed. no need, therefore is false
    resave: false,
    // saveUninitialized = initialize session even if there is no data to store
    saveUninitialized: true,
    store: mongoSessionStore,
    cookie: {
        maxAge: config.sessionExpDate
    }
}));

// server.use(passport.initialize());
// server.use(passport.session());

// routers
server.use('/api', usersRouter);
server.use('/api', booksRouter);



// passportConfiguration.configure(passport);

server.get("/", isLogged, async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/home/index.html'));
});

server.get("/login", isNotLogged, async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/login/index.html'));
});

server.get("/logout", isLogged, async function (req, res) {
    res.clearCookie('Logged');
    res.redirect('/login');
});

server.get("/register", isNotLogged, async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/register/index.html'));
});


server.use(errorHandler);
mongo.connect(function () {
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});


// Custom Middlewares

function isLogged(req, res, next) {
    if (req.cookies.Logged) {
        return next();
    }

    res.redirect('/login');
}

function isNotLogged(req, res, next) {
    if (!req.cookies.Logged) {
        return next();
    }

    res.redirect('/');
}

function errorHandler(err, req, res, next){
    if (err){
        console.log(err);
        res.send('<h1> Error in server </h1>');
    }
}