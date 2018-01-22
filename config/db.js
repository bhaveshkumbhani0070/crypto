var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://127.0.0.1:27017/admin";

exports.connect = function(callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
            console.log('Connection Error ', err);
            callback(false);
        } else {

            callback(db);
            // db.close();
        }
    });
};


// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
// // var mongoUrl = 'mongodb://heroku_bvm7pktg:curq73l0i58mhtvaq9a961sgc2@ds157584.mlab.com:57584/heroku_bvm7pktg';
// //console.log('mongoUrl', mongoUrl);
// exports.connect = function(callback) {
//     MongoClient.connect(mongoUrl, function(err, db) {
//         if (err) {
//             callback(false);
//         } else {
//             users = db.collection('users');
//             images = db.collection('images');
//             settings = db.collection('settings');
//             connections = db.collection('connections');
//             chatroom = db.collection('chatroom');
//             report = db.collection('report');
//             male = db.collection('male');
//             female = db.collection('female');

//             callback(db);
//             // db.close();
//         }
//     });
// };