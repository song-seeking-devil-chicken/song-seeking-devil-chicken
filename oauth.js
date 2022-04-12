/* eslint-disable no-console */
/* eslint-disable quote-props */
const axios = require('axios');
/**
 * the difference between json.stringify and qs.stringify...
 * https://stackoverflow.com/questions/15850866/are-json-and-node-js-querystring-the-same
 */
const qs = require('qs');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// query parameters
const artist = 'Polyphia';
const track = '40oz';

// get an access token using the app's client id and secret
const getAccessToken = async () => {
  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify(
      {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
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
};

const queryTracks = async (queryString) => {
  const accessToken = await getAccessToken();
  spotifyApi.setAccessToken(accessToken);
  const allResults = await spotifyApi.searchTracks(queryString)
    .then((data) => data.body.tracks.items);
  console.log('--------ALL RESULTS--------\n', allResults);
  const topResult = allResults[0];
  console.log('--------TOP RESULT--------\n', topResult);
  const { album, artists, name } = topResult;
  console.log('--------SONG NAME--------\n', name);
  console.log('--------ALBUM--------\n', album);
  console.log('--------ARTIST(S)--------\n', artists);
};

queryTracks(`track:${track} artist:${artist}`);
