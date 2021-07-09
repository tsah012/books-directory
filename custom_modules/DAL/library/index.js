const mongo = require('../../mongo');
const booksCol = require('../../configuration/app').booksCollection;
const ObjectId = require('mongodb').ObjectId;

module.exports.getAllBooks = async function () {
    try {
        const db = mongo.getDB();
        const books = await db.collection(booksCol).find().toArray();
        return books;
    } catch (error) {
        throw (error);
    }
}

module.exports.getBook = async function (bookId) {
    try {
        const db = mongo.getDB();
        const book = await db.collection(booksCol).findOne({ _id: ObjectId(bookId) });
        return book;
    } catch (error) {
        throw (error);
    }
}

module.exports.getBooks = async function (booksList) {
    try {
        const db = mongo.getDB();
        let booksIds = booksList.map((id) => { return ObjectId(id) });
        const books = await db.collection(booksCol).find({ _id: { $in: booksIds } }).toArray();
        return books;
    } catch (error) {
        throw (error);
    }
}