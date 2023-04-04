const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost:27017/test';
const mongo = new MongoClient(uri);

// enable all cors requests
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
