var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
//var { mongoose } = require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000; // process.env.PORT - used by heroku

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Success");
});

app.post('/sfshook', (req, res) => {

    if (req.headers["smartsheet-hook-challenge"]) {
        console.log("----------------------------Webhook Enabled--------------------------------------------");
        console.log("--------------------------------Request Header Webhook enable request:-----------------------------------------------");
        console.log(req.headers);
        console.log("--------------------------------*****End Request Header Webhook enable request:-----------------------------------------------");

        console.log("----------------------------------Body Webhook enable request:-------------------------------------------------");
        console.log(req.body);
        console.log("----------------------------------*****END Body Webhook enable request:-------------------------------------------------");
        res.header('smartsheet-hook-response', req.headers["smartsheet-hook-challenge"]);
        res.status(200).send(req.body);
    } else {
        console.log("sending cell update");
        console.log("Request:----------------------------------------------------------------");
        console.log(req);
        console.log("END Request:----------------------------------------------------------------");
        console.log("Body:-----------------------------------------------------------------");
        console.log(req.body);
        console.log("End Body:-----------------------------------------------------------------");
        console.log("Headers:--------------------------------------------------------------");
        console.log(req.headers);
        console.log("End Headers----------------------------------------------------------:");

        //const cellUpdateUrlBase = 'http://localhost:58037/api/cellchange/';
        const cellUpdateUrlBase = 'http://dcrm-app-001-d/sfsrestestore/api/cellchange/';

        res.header('Authorization', 'Basic ' + 'ZGV2XGNhY2FsZGVyOkxvcmUyMTIxIQ==');
        const earningUrl = `${cellUpdateUrlBase + req.body.webhookId}`;
        var sheetId = req.body.scopeObjectId;
        var rowId = req.body.events[1].id;
        var columnId = req.body.events[2].columnId;
        axios.post(`${earningUrl}`, {
            "columnId": columnId,
            "rowId": rowId,
            "sheetId": sheetId
        }).then(() => {
            res.status(200).send(req.body);
        });

        console.log(req.body);
    }

});

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app };




















// const axios = require('axios');





// var newStockEarning = new StockEarning({
//   symbol: 'aapl',
//   reportDateStr: "Mar 9",
//   reportTimeStr: "BeforeMarketOpen",
//   confCallStr: "Mar 9, 11:00 AM"
// });

// newStockEarning.save().then((doc) => {
//   console.log('Saved Stock Earning', doc);
// }, (e)=> {
//   console.log('Unable to save Earning')
// });

// let earningsUrl = 'https://www.jbloomberg.com/markets/api/calendar/earnings/US?locale=en&date=2017-03-15';
// axios.get(earningsUrl).then((response) => {
//   console.log(response.data.events);
// }).catch((e) => {
//   if(e.code == 'ECONNRESET'){
//     console.log('Unable to connect to API servers.');
//   }
//   console.log(e);
// });