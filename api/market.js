var cron = require('node-cron');
var Client = require('node-rest-client').Client;
var client = new Client();
var pool = require('../config/db.js');


pool.connect(function(db) {
    if (db) {
        // var market = db.collection('market');
        // market.find({}, function(err, data) {
        //     if (!err) {
        //         console.log('data', data);
        //     } else {
        //         console.log('Error', err);
        //     }
        // })
        console.log('connected');
    } else {
        console.log('Error');
    }
})

exports.getMarket = function(req, res) {
    // body...
    console.log('get market is called')
}
cron.schedule('0 */1 * * * *', function() {
    // test();
    // getMarketData();
});

function test() {
    console.log('Cron runnig');
}

function getMarketData() {
    console.log('saving market data into database')
    client.get("https://www.cryptopia.co.nz/api/GetMarkets", function(data, response) {
        if (data.Success == true) {
            for (var i = 0; i < data.Data.length; i++) {
                console.log(data.Data[i]);
            }
        } else {
            console.log('there is no any data found')
        }
    });
}