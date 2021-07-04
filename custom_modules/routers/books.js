const express = require("express");
const libraryDAL = require('../DAL/library');
const dbLogger = require('../logger');
const httpStatusCodes = require("http-status-codes")

const router = express.Router();

router.get('/library', async function (req, res) {
    try {
        let books = await libraryDAL.getLibraryBooks();
        res.send(books);
    }
    catch (err) {
        console.log(err);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        throw (err);
    }
});


module.exports = router;