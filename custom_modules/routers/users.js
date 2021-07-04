const express = require("express");
const dbLogger = require('../logger');
const usersDAL = require('../DAL/users');
const httpStatusCodes = require("http-status-codes").StatusCodes;
const router = express.Router();

router.post('/user/add', async function (req, res, next) {
    try {
        let user = await usersDAL.addUser(req.body.name, req.body.mail, req.body.password);
        res.send({status: true, message: 'Request ended successfully'});
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;