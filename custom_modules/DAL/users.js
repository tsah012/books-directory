module.exports.getUser = async function (db, _mail) {
    try {
        let user = await db.collection('users').findOne({mail:_mail});
        console.log('DAL getUser result: ' + user);
        if (!user){
            return false;
        }

        return user;
    } 
    catch (error) {
        throw error;
    }
}

module.exports.addUser = async function (db, _name, _mail, _password, _admin=false, _books=[]) {
    try {
        let user = await db.collection('users').insertOne({name: _name, mail:_mail, password:_password, admin:_admin, books:_books});
        console.log('DAL addUser result: ' + user);
        return user;   
    } 
    catch (error) 
    {
        throw error;
    }
}

module.exports.authenticateUser = async function (db, _mail, _password) {
    try {
        let user = await db.collection('users').findOne({mail:_mail, password:_password});
        console.log('DAL authenticateUser result: ' + user);
        if (!user){
            return false;
        }
        
        return true;
    } 
    catch (error) {
        throw error;
    }
}