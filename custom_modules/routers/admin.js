const express = require("express");
const logsDAL = require('../DAL/logs');
const auth = require('./authMiddlewares');
const dbLogger = require('../logger');
const httpStatusCodes = require("http-status-codes").StatusCodes;

const router = express.Router();


router.get('/logs', auth.isAdmin, async function (req, res) {
    try {
        let logs = await logsDAL.getLogs();
        res.send(logs);
    }
    catch (err) {
        dbLogger.saveLog(err);
        let msg = "Issue occured when fetching data. Error:\n" + err;
        console.log(msg);
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send(msg);
    }
});

module.exports = router;