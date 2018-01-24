var cron = require('node-cron');
var Client = require('node-rest-client').Client;
var client = new Client();
var pool = require('../config/db.js');





exports.getMarket = function(req, res) {
    // body...
    var label = req.query.label;
    var time = req.query.time;
    pool.connect(function(db) {
        if (db) {
            console.log('connected');
            //"ETH/BTC"
            market.find({ Label: label }).sort({ date: -1 }).limit(1).toArray(function(err, data) {
                if (!err) {
                    var maxDate = data[0].date;
                    console.log('maxDate', maxDate)
                    maxDate = maxDate - 1000 * 10 * 60 * time;
                    console.log('maxDate', maxDate);

                    market.find({ $and: [{ Label: label }, { date: { $gt: maxDate } }] }).sort({ date: -1 }).toArray(function(err, data) {
                        if (!err) {
                            console.log('data', data.length);
                            console.log('data', data);
                            res.json({ code: 200, status: 'success', message: 'market get successfully', Data: data });
                            return;
                        } else {
                            console.log('Error', err);
                            res.json({ code: 200, status: 'error', message: 'error for get market' });
                            return;
                        }
                    });
                } else {
                    console.log('Error', err);
                    res.json({ code: 200, status: 'error', message: 'error for get market' });
                    return;
                }
            })
        } else {
            console.log('Error');
            res.json({ code: 200, status: 'error', message: 'error for get market' });
            return;
        }
    })
}


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