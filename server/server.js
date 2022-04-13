const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// initialize Express app and establish server port number
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

// connect to the MongoDB database
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log(`Connected to ${mongoose.connection.name}`);
});

// require controllers
const controllers = require('./controllers/controllers');

// require routes
const loginRoute = require('./routes/loginRoute');
const oauthRoute = require('./routes/oauthRoute');

/**
 * TODO: /api/login never actually reaches the final middleware function
 * Handles requests when user logs in to Song Seeking Devil Chicken.
 * User is redirected to Spotify login via this route.
 */
app.use('/api/login', loginRoute, (req, res) => res.sendStatus(200));

/**
 * TODO: /authenticate never actually reaches the final middleware function
 * Once a user logs in, they are redirected here.
 * User is given an access and refresh token here so that they can use the Spotify API.
 */
app.use('/authenticate', oauthRoute, (req, res) => res.sendStatus(200));

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

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  /**
   * TODO:
   * confirm that we are using object destructuring to replace of Object.assign() correctly
   */
  const errorObj = { ...defaultErr, ...err }; // Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
