/* eslint-disable no-console */
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/SFSDemoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Events').find().toArray().then((docs) => {
        console.log('Events');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch events', err);
    });

    // db.close();
});