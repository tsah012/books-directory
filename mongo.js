const config = require("./configuration_settings");
const mongodb = require('mongodb').MongoClient;
var _db = false;

function connect(fn) {
    mongodb.connect(config.dbConnectionString + config.dbName, function (err, database) {
        if (err) throw err;
        _db = database.db();
        fn();
    });
};

function getDB(){
    return _db;
}

module.exports = {connect, getDB}