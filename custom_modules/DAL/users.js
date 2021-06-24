module.exports.getUser = async function (db, username, pass) {
    let user = await db.collection('users').findOne({mail:username, password:pass});
    console.log('DAL getUser result: ' + user);
    if (!user){
        return false;
    }
    return user;
}