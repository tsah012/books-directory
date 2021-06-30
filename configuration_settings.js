module.exports = {
    port: 3000,
    dbConnectionString: "mongodb://localhost:27017/",
    dbName: "booksdir",
    storeCollection: "sessions",
    secret: "badook",
    sessionExpDate: 24*60*60*1000 // time in milliseconds
}