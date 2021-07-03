const mongo = require('../../mongo');
const ObjectId = require('mongodb').ObjectId


module.exports.getUserById = async function (userId) {
    try {
        const db = mongo.getDB();
        const user = await db.collection('users').findOne({_id:ObjectId(userId)});
        if (!user){
            return false;
        }

        return user;
    } 
    catch (error) {
        throw error;
    }
}

module.exports.getUserByMail = async function (_mail) {
    try {
        const db = mongo.getDB();
        const user = await db.collection('users').findOne({mail:_mail});
        if (!user){
            return false;
        }

        return user;
    } 
    catch (error) {
        throw error;
    }
}

module.exports.addUser = async function (_name, _mail, _password, _admin=false, _books=[]) {
    try {
        validateUserFields(_name, _mail, _password);
        const db = mongo.getDB();
        const user = await db.collection('users').insertOne({name: _name, mail:_mail, password:_password, admin:_admin, books:_books});
        return user;
    } 
    catch (error) 
    {
        throw error;
    }
}

function validateUserFields(name, email, password){
    if (!(validateName(name) && validateEmail(email) && validatePassword(password))){
        throw ("Invalid input");
    }
}

function validateName(name) {
    return name.trim().length;
}

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.trim().length;
}