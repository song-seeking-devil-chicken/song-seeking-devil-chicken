const express = require('express');

const router = express.Router();
const SAPI = require('../controllers/spotifyAPIcontroller');

router.get('/me', async (req, res, next) => {
  console.log('hello, you made it to /me');
  const id = req.cookies['session-id'];
  res.locals.body = await SAPI.invokeSession(id).getMe();
  return next();
});

router.get('/search', async (req, res, next) => {
  console.log('hello, you made it to /search');
  const id = req.cookies['session-id'];
  // const { query } = req.params;
  const query = 'Love';
  /**
   * SAPI.invokeSession(id).searchTracks(query) returns an object.
   * Access the array of songs with response.body.tracks.items.
   * Max song array size by default is 20, defined by the SAPI.
   * res.locals.body is an array of songs
   */
  res.locals.body = await SAPI.invokeSession(id).searchTracks(query)
    .then((response) => response.body.tracks.items);
  // console.log(res.locals.body);
  if (res.locals.body.length > 5) {
    res.locals.body = res.locals.body.slice(0, 5);
  }
  return next();
});

module.exports = router;
