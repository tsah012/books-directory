const httpStatusCodes = require("http-status-codes").StatusCodes
const passport = require('passport');

module.exports.isAuth = function(req, res, next){
    passport.authenticate('jwt', {session:false}, function (err, user, info){
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                status: 'error',
                error: 'ANOTHORIZED_USER'
            });
        }
        // Forward user information to the next middleware
        req.user = user; 
        next();
    })(req, res, next);
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