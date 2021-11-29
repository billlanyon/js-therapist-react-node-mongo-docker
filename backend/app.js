const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Treatment = require('./models/treatment');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/treatments', async (req, res) => {
  console.log('TRYING TO FETCH TREATMENTS');
  try {
    const treatments = await Treatment.find();
    res.status(200).json({
      treatments: treatments.map((treatment) => ({
        id: treatment.id,
        text: treatment.text,
      })),
    });
    console.log('FETCHED TREATMENTS');
  } catch (err) {
    console.error('ERROR FETCHING TREATMENTS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load treatments.' });
  }
});

app.post('/treatments', async (req, res) => {
  console.log('TRYING TO STORE TREATMENT');
  const treatmentText = req.body.text;

  if (!treatmentText || treatmentText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid treatment text.' });
  }

  const treatment = new Treatment({
    text: treatmentText,
  });

  try {
    await treatment.save();
    res
      .status(201)
      .json({ message: 'Treatment saved', treatment: { id: treatment.id, text: treatmentText } });
    console.log('STORED NEW TREATMENT');
  } catch (err) {
    console.error('ERROR FETCHING TREATMENT');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save treatment.' });
  }
});

app.delete('/treatments/:id', async (req, res) => {
  console.log('TRYING TO DELETE TREATMENT');
  try {
    await Treatment.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted treatment!' });
    console.log('DELETED TREATMENT');
  } catch (err) {
    console.error('ERROR FETCHING TREATMENTS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete treatment.' });
  }
});

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/treatments?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB');
      app.listen(80);
    }
  }
);
