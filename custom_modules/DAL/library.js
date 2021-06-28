const mongo = require('../../mongo');

module.exports.getLibraryBooks = async function () {
    const db = mongo.getDB();
    const books = await db.collection('library').find().toArray();
    return books;
}