const express = require('express');
const querystring = require('qs');

// properties to be used in the Spotify login request
const clientId = process.env.CLIENT_ID;
const redirectUri = 'http://localhost:9000/discover';

const router = express.Router();

/**
 * @param {string} length
 * @returns {string}
 * creates a random string to be used for state property of the query to Spotify
 * random string is used for security purposes with Spotify API
 */
function generateRandomString(length) {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomString;
}

// redirects user to Spotify login page
router.get('/', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';

  res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
  })
  }`);
});

module.exports = router;
