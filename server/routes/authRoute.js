// routes.js
const express = require('express');
const router = express.Router();
const Table = require('../models/Tables'); // Make sure the path is correct

router.post('/tables', async (req, res) => {
  try {
    const table = await Table.create(req.body); // Using the create method of the Table model
    res.status(201).json(table);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tables', async (req, res) => {
  try {
    const tables = await Table.find(); // Using the find method of the Table model
    res.json(tables);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/tables/:id', async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Using the findByIdAndUpdate method of the Table model
    res.json(table);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tables/:id', async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id); // Using the findByIdAndDelete method of the Table model
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
