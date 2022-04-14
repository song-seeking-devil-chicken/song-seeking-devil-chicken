const express = require('express');
const axios = require('axios');
const Session = require('../models/Session')

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
  const { query } = req.query;
  if (!query) {
    res.locals.body = [];
    return next();
  }
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

router.get('/audioFeatures', async (req, res, next) => {
  console.log('hello, you made it to /audioFeatures');
  const id = req.cookies['session-id'];
  // TODO: change from hard-coded trackId to req.query params
  const audioFeatures = await SAPI.invokeSession(id).getAudioFeaturesForTrack('3v3VFa7Dt32gNR27jfw7DG')
    .then((response) => response.body);
  res.locals.body = audioFeatures;
  return next();

  // object that's returned with audioFeatures:
  // {
  //   danceability: 0.597,
  //   energy: 0.845,
  //   key: 1,
  //   loudness: -7.803,
  //   mode: 0,
  //   speechiness: 0.0335,
  //   acousticness: 0.00267,
  //   instrumentalness: 0.173,
  //   liveness: 0.203,
  //   valence: 0.63,
  //   tempo: 140.005,
  //   type: 'audio_features',
  //   id: '3v3VFa7Dt32gNR27jfw7DG',
  //   uri: 'spotify:track:3v3VFa7Dt32gNR27jfw7DG',
  //   track_href: 'https://api.spotify.com/v1/tracks/3v3VFa7Dt32gNR27jfw7DG',
  //   analysis_url: 'https://api.spotify.com/v1/audio-analysis/3v3VFa7Dt32gNR27jfw7DG',
  //   duration_ms: 233819,
  //   time_signature: 4
  // }
});

router.get('/myPlaylists', async (req, res, next) => {
  console.log('hello, you made it to /myPlaylists');
  const id = req.cookies['session-id'];
  const me = await SAPI.invokeSession(id).getMe();
  const myId = me.body.id;
  const myPlaylists = await SAPI.invokeSession(id).getUserPlaylists(myId)
    .then((response) => response.body.items);
  res.locals.body = myPlaylists;
  return next();
});

async function startPlayback(deviceId, contextUri, authToken) {
  const data = {
    uris: [contextUri]
  }
  console.log(data);
  await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  });
  // const response = await axios.post(tokenUrl, data, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  // });
}

router.put('/playsong', async (req, res, next) => {
  const id = req.cookies['session-id'];
  const userSession = await Session.findById(req.cookies['session-id']).exec();
  const authToken = userSession.authToken;
  console.log('Playing song...');
  const data = req.body;
  const { context_uri, device_id } = data;
  await startPlayback(device_id, context_uri, authToken)
  res.send('OK');
})
// router.get('/myRecentSongs', async (req, res, next) => {
//   console.log('hello, you made it to /myRecentSongs');
//   const id = req.cookies['session-id'];
//   const me = await SAPI.invokeSession(id).getMe();
//   const myId = me.body.id;
//   const myRecentSongs = await SAPI.invokeSession(id).getMyRecentlyPlayedTracks(myId)
//     .then((response) => response);
//   console.log(myRecentSongs);
//   res.locals.body = myRecentSongs;
//   return next();
// });

module.exports = router;
