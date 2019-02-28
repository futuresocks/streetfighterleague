const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('./error_handler');

const createRouter = function(collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => errorHandler(err, res))
  });

  router.post('/', (req, res) => {
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0]);
    })
    .catch((err) => errorHandler(err, res));
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    delete updatedData._id;

    collection
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: updatedData })
    .then(result => {
      res.json(result.value);
    })
    .catch((err) => errorHandler(err, res));
  });

  return router;
};

module.exports = createRouter;
