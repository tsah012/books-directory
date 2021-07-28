const httpStatusCodes = require("http-status-codes").StatusCodes
const passport = require('passport');

module.exports.isAuth = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                status: false,
                message: 'UNANOTHORIZED_USER',
                data: info
            });
        }
        // Forward user information to the next middleware
        req.user = user;
        next();
    })(req, res, next);
}

module.exports.isNotAuth = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next();
        }
        // redirect to home page in case user is authorized
        res.redirect('/');
    })(req, res, next);
}

module.exports.isAdmin = function (req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        res.status(httpStatusCodes.UNAUTHORIZED);
        res.json({
            status: false,
            message: 'Access denied. Administrator permissions required.'
        });
    }
}