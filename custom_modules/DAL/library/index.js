const mongo = require('../../mongo');
const booksCol = require('../../configuration/app');

module.exports.getLibraryBooks = async function () {
    try {
        const db = mongo.getDB();
        const books = await db.collection(booksCol).find().toArray();
        return books;
    } catch (error) {
        throw (error);
    }
}