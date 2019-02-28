const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");

app.use(cors())
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('streetfighterleague');
    const playersCollection = db.collection('players');
    const fixturesCollection = db.collection('fixtures');
    const fightersCollection = db.collection('fighters');
    app.use('/api/fighters', createRouter(fightersCollection));
    app.use('/api/players', createRouter(playersCollection));
    app.use('/api/fixtures', createRouter(fixturesCollection));
  })
  .catch(console.error);

app.listen(3000, function() {
  console.log(`SFL server running on port ${this.address().port}`);
})
