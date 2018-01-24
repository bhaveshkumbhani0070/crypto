var express = require('express');
// var apiRoutes = express.Router();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var busboy = require('connect-busboy');
var app = express();
var multer = require('multer')

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 50000
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,token,app_version,api_version,app_type,language');
    //res.setHeader('*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var pool = require(__dirname + '/config/db.js');
var market = require(__dirname + "/api/market.js");



app.get('/', function(req, res) {
    res.sendFile('index.html', { 'root': "view" });
});
app.use(expressValidator());
app.use(bodyParser.json());
app.use(busboy());

// app.use("/js", express.static(__dirname + '/js'));

// var jobs = require(__dirname + '/api/worker')(app);
//Call API//   
// apiRoutes.use(function(req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['token'];
//     if (token) {
//         jwt.verify(token, config.secret, function(err, decoded) {
//             if (err) {
//                 return res.json({ "code": 200, "status": "Error", "message": "Failed to authenticate token" });
//             } else {
//                 req.user = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.json({ "code": 200, "status": "Error", "message": "No token provided" });
//     }
// });
// app.use('/api', apiRoutes);

app.get('/api/getMarket', market.getMarket);
// create server port //
app.listen(app.get('port'));
console.log("Started on Port No. ", app.get('port'));