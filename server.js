const config = require("./configuration_settings");
const passportConfiguration = require('./passport-config');
const usersRouter = require("./custom_modules/routers/users");
const booksRouter = require("./custom_modules/routers/books");
const auth = require('./custom_modules/routers/authMiddlewares')
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

server.use(passport.initialize());
server.use(passport.session());
passportConfiguration.configure(passport);

// routers
server.use('/api', usersRouter);
server.use('/api', booksRouter);

server.get("/", auth.isAuth, async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/home/index.html'));
});

server.get("/login", passport.authenticate('local', {failureRedirect:'/login', successRedirect: '/'}));

server.post("/logout", async function (req, res) {
    req.logOut();
    res.redirect('/login');
});

server.get("/register", async function (req, res) {
    res.sendFile(path.join(__dirname, 'client/pages/register/index.html'));
});


server.use(errorHandler);
mongo.connect(function () {
    server.listen(config.port, function () {
        console.log("listening on port", config.port);
    });
});


// Error handler middleware in order to avoid crushing of the server
function errorHandler(err, req, res, next){
    if (err){
        console.log(err);
        res.send('<h1> Error in server </h1>');
    }
}