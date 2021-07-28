const express = require("express");
const passport = require('passport');
const path = require('path');
const auth = require('./authMiddlewares');
const config = require('../configuration/app');
const usersDAL = require('../DAL/users');
const utils = require('../utils');
const router = express.Router();


router.get("/login", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/login/index.html'));
});

router.post("/login", auth.isNotAuth, async function (req, res, next) {
    try {
        const user = await usersDAL.getUserByMail(req.body.mail);
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const JWT = utils.issueJWT(user);
                res.json({ status: true, data: JWT });
            }
            else {
                res.json({ status: false, message: 'Incorrect password' })
            }
        }
        else {
            res.json({ status: false, message: 'Incorrect username' });
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/logout", function (req, res) {
    res.send({ status: true });
});

router.get("/register", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/register/index.html'));
});

module.exports = router;