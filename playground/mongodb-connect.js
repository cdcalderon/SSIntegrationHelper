/* eslint-disable no-console */
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/SFSDemoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Events').insertOne({
    //   text: 'Something to do',
    //   completed: false
    // }, (err, result) => {
    //   if(err) {
    //     return console.log('Unable to insert event', err);
    //   }

    //   console.log(JSON.stringify(result.ops, undefined, 2));
    // })


    db.close();
});