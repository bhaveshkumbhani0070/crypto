var cron = require('node-cron');
var Client = require('node-rest-client').Client;
var client = new Client();
var pool = require('../config/db.js');





exports.getMarket = function(req, res) {
    // body...
    console.log('get market is called')
}

// var min = 1;
// pool.connect(function(db) {
//     if (db) {
//         console.log('connected');

//         market.find({ $and: [{ Label: "ETH/BTC" }, { date: { $lt: 1516696691490 + 1000 * 60 * 1, $gte: 1516696691490 } }] }).toArray(function(err, data) {
//             // market.find({ Label: "ETH/BTC" }).toArray(function(err, data) {
//             if (!err) {
//                 // var lastTime = 1516696691490 + 1000 * 60 * 1;
//                 // console.log('lastTime', lastTime);
//                 for (var i = 0; i < data.length; i++) {
//                     console.log('data', data[i]);
//                     // var start = data[i].date;
//                     // var end = data[i + 1] ? data[i + 1].date : "";
//                     // getDiff(start, end);
//                 }
//             } else {
//                 console.log('Error', err);
//             }
//         })
//     } else {
//         console.log('Error');
//     }
// })

function getDiffVolum() {

}


pool.connect(function(db) {
    if (db) {
        console.log('connected');
        cron.schedule('0 */1 * * * *', function() {
            addMarketData();
        });

    } else {
        console.log('Error');
    }
})


function addMarketData() {
    console.log('saving market data into database')
    client.get("https://www.cryptopia.co.nz/api/GetMarkets", function(data, response) {
        if (data.Success == true) {
            for (var i = 0; i < data.Data.length; i++) {
                var date = new Date().getTime();
                var d = {
                    "TradePairId": data.Data[i].TradePairId,
                    "Label": data.Data[i].Label,
                    "AskPrice": data.Data[i].AskPrice,
                    "BidPrice": data.Data[i].BidPrice,
                    "Low": data.Data[i].Low,
                    "High": data.Data[i].High,
                    "Volume": data.Data[i].Volume,
                    "LastPrice": data.Data[i].LastPrice,
                    "BuyVolume": data.Data[i].BuyVolume,
                    "SellVolume": data.Data[i].SellVolume,
                    "Change": data.Data[i].Change,
                    "Open": data.Data[i].Open,
                    "Close": data.Data[i].Close,
                    "BaseVolume": data.Data[i].BaseVolume,
                    "BuyBaseVolume": data.Data[i].BuyBaseVolume,
                    "SellBaseVolume": data.Data[i].SellBaseVolume,
                    "date": date
                }
                market.insert(d, function(err, data) {
                    if (!err) {
                        console.log('inserted');
                    } else {
                        console.log('Error', err);
                    }
                })
            }
        } else {
            console.log('there is no any data found')
        }
    });
}

function getDiff(date1, date2) {
    var today = new Date(date1);
    var Christmas = new Date(date2);
    var diffMs = (Christmas - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    console.log('diffMins', diffMins);
    return diffMins;
}