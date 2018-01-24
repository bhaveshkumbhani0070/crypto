var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://128.199.64.173/admin";

exports.connect = function(callback) {
    MongoClient.connect(mongoUrl,
        function(err, db) {
            if (err) {
                console.log('Connection Error ', err);
                callback(false);
            } else {
                market = db.collection('market');
                callback(db);
                // db.close();
            }
        });
};