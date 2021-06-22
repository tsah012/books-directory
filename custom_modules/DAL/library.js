module.exports.getLibraryBooks = async function (db) {
    let books = await db.collection('library').find().toArray();
    return books;
}