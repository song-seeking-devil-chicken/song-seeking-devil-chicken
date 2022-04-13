const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const querystring = require('qs');
const axios = require('axios');
require('dotenv').config();

// initialize Express app,  and establish port number
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

/**
 * handles requests when user logs in
 * user is redirected to Spotify login here
 */
app.use('/api/login', loginRoute, (req, res) => res.sendStatus(200));

async function getAccessToken(code, state) {
  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify(
      {
        code,
        state,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:9000/discover',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    );
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
    return error;
  }
}

app.get('/discover', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  console.log('code:', code);
  console.log('state:', state);

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const accessToken = await getAccessToken(code, state);
    // TODO:
    // determine appropriate redirect
    // store access token on server side
    console.log(accessToken);
    res.redirect('http://localhost:3000/profile');
  }
});

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
