var cron = require('node-cron');
var Client = require('node-rest-client').Client;
var client = new Client();
var pool = require('../config/db.js');





exports.getMarket = function(req, res) {
    // body...
    console.log('get market is called')
}
pool.connect(function(db) {
    if (db) {
        console.log('connected');
        cron.schedule('0 */1 * * * *', function() {
            // test();
            getMarketData();
        });

    } else {
        console.log('Error');
    }
})


// function test() {
//     console.log('Cron runnig');
// }

function getMarketData() {
    console.log('saving market data into database')
    client.get("https://www.cryptopia.co.nz/api/GetMarkets", function(data, response) {
        if (data.Success == true) {
            for (var i = 0; i < data.Data.length; i++) {
                var date = new Date().getTime();
                var data = {
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
                market.insert(data, function(err, data) {
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