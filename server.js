const config = require("./configuration_settings");
// const passportConfiguration = require('./passport-config');
const usersRouter = require("./custom_modules/routers/users");
const booksRouter = require("./custom_modules/routers/books");
const usersDAL = require('./custom_modules/DAL/users');

const path = require('path');
// const mongodb = require('mongodb').MongoClient;
const mongo = require('./mongo');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');


const server = express();

server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use(express.static(path.join(__dirname, 'client')));
server.use(express.urlencoded());
server.use(express.json());
// server.use(flash());
// server.use(session({
//     secret: config.secret,
//     // resave = save session in case nothing is changed. no need, therefore is false
//     resave: false,
//     // saveUninitialized = save empty values in session. no,therefore is false
//     saveUninitialized: false
// }));

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


mongo.connect(function () {
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});
