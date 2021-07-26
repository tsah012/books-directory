const usersDAL = require('../../../DAL/users');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const utils = require('../../../utils');

passportJWTOptions = {
    secretOrKey: utils.getPublicKey(),
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    algorithms: ['RS256']
}

async function authenticationCB(payload, done) {
    try {
        const user = await usersDAL.getUserById(payload.sub);
        if (!user) {
            return done(null, false, { message: 'Account does not exist' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    }
    catch (error) {
        done(error);
    }
}


module.exports.configure = function (passport) {
    const strategy = new jwtStrategy(passportJWTOptions, authenticationCB)

    passport.use(strategy);
    passport.serializeUser((user, done) => { done(null, user._id) });
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await usersDAL.getUserById(userId);
            done(null, user);
        }
        catch (error) {
            done(error)
        }
    });
}