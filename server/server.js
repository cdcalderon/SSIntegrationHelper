var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
//var { mongoose } = require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000; // process.env.PORT - used by heroku

app.use(bodyParser.json());

app.post('/sfshook', (req, res) => {

    if (req.headers["smartsheet-hook-challenge"]) {
        console.log("Webhook Enabled");
        console.log(req.body);
        res.header('smartsheet-hook-response', req.headers["smartsheet-hook-challenge"]);
        res.status(200).send(req.body);
    } else {
        // do something with event information
        console.log("sending cell update")
        const cellUpdateUrlBase = 'http://localhost:58037/api/cellchange/';
        const earningUrl = `${cellUpdateUrlBase + req.body.webhookId}`;
        var sheetId = req.body.events[0].id;
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
    //res.status(200).send(req.body);

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