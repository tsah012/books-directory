const process = require('process');
const root = process.cwd();

module.exports = {
    port: 3000,
    root: root,
    dbConnectionString: 'mongodb://localhost:27017/',
    dbName: 'booksdir',
    booksCollection: 'library',
    usersCollection: 'users',
    logsCollection: 'logs',
    storeCollection: 'sessions',
    secret: 'badook',
    tokenExpirationTime: '1d', //expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js)
    sessionExpDate: 24*60*60*1000 // time in milliseconds
}