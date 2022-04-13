const express = require('express');
const querystring = require('qs');

const clientId = process.env.CLIENT_ID;
const redirectUri = 'http://localhost:9000/authenticate';

const router = express.Router();

/**
 * @param {string} length
 * @returns {string}
 * Creates a random string to be used for "state" property of the query to Spotify.
 * Random string is used for security purposes with Spotify API.
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

/**
 * Redirects user to Spotify login page.
 * Once the user logs in, they are redirected to /authenticate,
 * where they are granted an access and refresh token to access the Spotify API.
 */
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
