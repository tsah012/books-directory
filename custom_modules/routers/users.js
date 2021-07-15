const express = require("express");
const usersDAL = require('../DAL/users');
const libraryDAL = require('../DAL/library');
const auth = require('./authMiddlewares');
const httpStatusCodes = require("http-status-codes").StatusCodes;
const router = express.Router();

router.post('/user/add', async function (req, res, next) {
    try {
        let user = await usersDAL.addUser(req.body.name, req.body.mail, req.body.password);
        res.status(httpStatusCodes.CREATED).send({ status: true, message: 'Request ended successfully' });
    }
    catch (err) {
        next(err);
    }
});


// Authenticated routes - only if user is loggen in
//------------------------------------------------------------------

router.get('/user', auth.isAuth, async function (req, res, next) {
    try {
        let user = req.user;
        delete user.password;
        res.send(user);
    }
    catch (err) {
        next(err);
    }
});

router.put('/user/books', auth.isAuth, async function (req, res, next) {
    try {
        // Get books from DB in order to validate books and remove duplicates
        let books = await libraryDAL.getBooks(req.body.books);
        let result = await usersDAL.updateUserBooks(req.user._id, books);

        if (result.result.ok) {
            res.send({ status: true, message: 'Request ended successfully', data: books });
        }
        else{
            res.send({ status: false, message: 'Request failed' });
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;