// const Test = require('./controllers')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const controllers = require('./controllers/controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// should add a song to the database using the songSchema defined in models.js
app.post('/api/addSong', controllers.addSong, (req, res) => {
  console.log(res.locals.newSong);
  return res.status(201).json(res.locals.newSong);
});

app.get('/api/getSavedSongs', controllers.getSongList, (req, res) => res.status(200).send(res.locals.songArray));

app.use('/api', controllers.getId, controllers.getSong, (req, res) => {
  console.log('data received');
  return res.sendStatus(200);
});

app.use('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  /**
   * TODO:
   * confirm that we are using object destructuring in place of Object.assign() correctly
   */
  const errorObj = { ...defaultErr, ...err };
  // Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
