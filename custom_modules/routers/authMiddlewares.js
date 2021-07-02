const httpStatusCodes = require("http-status-codes").StatusCodes

module.exports.isAuth = function(req, res, next){
    if (req.isAuthenticated()){
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
    if (req.isAuthenticated() && req.user.admin){
        next();
    }else{
        res.status(httpStatusCodes.UNAUTHORIZED);
        res.end();
    }
}