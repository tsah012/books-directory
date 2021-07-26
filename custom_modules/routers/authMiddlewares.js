const httpStatusCodes = require("http-status-codes").StatusCodes
const passport = require('passport');

module.exports.isAuth = function(req, res, next){
    if (passport.authenticate('jwt', {session:false})){
        next();
    }else{
        res.status(httpStatusCodes.UNAUTHORIZED);
        res.end();
    }
}

module.exports.isNotAuth = function(req, res, next){
    if (!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

module.exports.isAdmin = function(req, res, next){
    if (req.user.admin){
        next();
    }else{
        res.status(httpStatusCodes.UNAUTHORIZED);
        res.send('Access denied. Administrator permissions required.');
    }
}