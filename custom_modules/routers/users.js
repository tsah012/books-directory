const express = require("express");
const libraryDAL = require('../DAL/library');
const usersDAL = require('../DAL/users')
const httpStatusCodes = require("http-status-codes").StatusCodes
const router = express.Router();

router.post('/user/add', async function (req, res) {
    try {
        let user = await usersDAL.addUser(req.body.name, req.body.mail, req.body.password);
        res.send({status: true, message: 'Request ended successfully'});
    }
    catch (err) {
        let msg = "Issue occured when creating user. Error:\n" + err;
        console.log(msg);
        res.send({status: false, message: err});
    }
});


module.exports = router;