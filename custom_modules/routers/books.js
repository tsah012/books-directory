const express = require("express");
const libraryDAL = require('../DAL/library');
const httpStatusCodes = require("http-status-codes").StatusCodes;

const router = express.Router();

router.get('/library', async function (req, res, next) {
    try {
        let books = await libraryDAL.getAllBooks();
        res.send(books);
    }
    catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
        next(err);
    }
});


module.exports = router;