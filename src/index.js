const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/test';
const mongo = new MongoClient(uri);

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/posts', (req, res) => {
  mongo
    .db()
    .collection('posts')
    .find()
    .toArray()
    .then(posts => {
      res.send(posts);
    });
});

mongo.connect().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
