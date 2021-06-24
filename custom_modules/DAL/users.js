module.exports.getUser = async function (db, username) {
    let user = await db.collection('users').findOne({mail:username});
    console.log('DAL getUser result: ' + user);
    return user;
}