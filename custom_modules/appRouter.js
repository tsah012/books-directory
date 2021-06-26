const express = require("express");
const libraryDAL = require('./DAL/library');
const usersDAL = require('./DAL/users')
const httpStatusCodes = require("http-status-codes")

const router = express.Router();

router.get('/library', async function (req, res) {
    try {
        let books = await libraryDAL.getLibraryBooks(req.app.locals.db);
        res.send(books);
    }
    catch (err) {
        let msg = "Issue occured when fetching data from library collection. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(msg);
    }
});

router.post('/user', async function (req, res) {
    try {
        let user = await usersDAL.getUser(req.app.locals.db, req.body.mail);
        // Do not return sensitive data to client
        delete user._id;
        delete user.password;
        res.send(user);
    }
    catch (err) {
        let msg = "Issue occured when fetching user from users collection. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(false);
    }
});

router.post('/user/authenticate', async function (req, res) {
    try {
        let success = await usersDAL.authenticateUser(req.app.locals.db, req.body.mail, req.body.password);
        res.send(success);
    }
    catch (err) {
        let msg = "Issue occured when fetching user from users collection. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(false);
    }
});

router.post('/user/add', async function (req, res) {
    try {
        let user = await usersDAL.addUser(req.app.locals.db, req.body.name, req.body.mail, req.body.password);
        res.send(user);
    }
    catch (err) {
        let msg = "Issue occured when fetching user from users collection. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(false);
    }
});


module.exports = router;