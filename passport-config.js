const usersDAL = require('./custom_modules/DAL/users');
const localStrategy = require('passport-local').Strategy;


module.exports.configure = function(passport) {

    passport.use(new localStrategy({ usernameField: 'mail', passwordField: 'password' }, authenticateUser));

    passport.serializeUser((user, done) => { done(null, user.mail) });
    passport.deserializeUser((mail, done) => { done(null, usersDAL.getUser(mail)) });
}

async function authenticateUser(mail, password, done) {
    try {
        const user = await usersDAL.getUser(mail);
        if (!user) {
            return done(null, false, {message: 'USER WITH THAT EMAIL DOES NOT EXISTS'});
        }

        if (user.password != password){
            return done(null, false, {message: 'INCORRECT PASSWORD'});
        }

        return done(null, user);
    }
    catch (error) {
        done(error);
    }
}