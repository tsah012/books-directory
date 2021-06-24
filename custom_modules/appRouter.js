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

router.get('/user', async function (req, res) {
    try {
        let user = await usersDAL.getUser(req.app.locals.db, req.query.username, req.query.password);
        res.send(user);
    }
    catch (err) {
        let msg = "Issue occured when fetching user from users collection. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(msg);
    }
});


module.exports = router;