const mongo = require('../../mongo');

module.exports.getUser = async function (_mail) {
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
        const db = mongo.getDB();
        const user = await db.collection('users').insertOne({name: _name, mail:_mail, password:_password, admin:_admin, books:_books});
        return user;
    } 
    catch (error) 
    {
        throw error;
    }
}

module.exports.authenticateUser = async function (_mail, _password) {
    try {
        const db = mongo.getDB()
        const user = await db.collection('users').findOne({mail:_mail, password:_password});
        if (!user){
            return false;
        }
        
        return true;
    } 
    catch (error) {
        throw error;
    }
}