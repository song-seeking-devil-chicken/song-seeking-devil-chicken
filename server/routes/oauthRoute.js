const express = require('express');
const querystring = require('qs');
const axios = require('axios');
// const { json } = require('body-parser');
const Session = require('../models/Session');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = `${process.env.BASE_URL}/api/authenticate`;

const router = express.Router();

/**
 * @param {String} code
 * @param {String} state
 * @returns {Object}
 * Based on the "code" and "state" parameters, which are
 * derived from query parameters of the redirect link after a user signs in with Spotify.
 * Retrieves an access and refresh token from Spotify so that the user of Song Seeking Devil Chicken
 * can interact with the Spotify API.
 */
async function getAccessToken(code, state) {
  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify({
      code,
      state,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  } catch (error) {
    return error;
  }
}

/**
 * @param {String} accessToken
 * @returns {String}
 * Sends a get request to Spotify API to retrieve user email based on their access token.
 * Invoked right after an access token is generated.
 * Used to populate a Session document in the MongoDB database.
 */
async function getUserEmail(accessToken) {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.data.email;
}

/**
 * Calls getAccessToken() and getUserEmail().
 * Stores the access and refresh token granted by Spotify.
 * Creates a new Session MongoDB document that represents the user's session.
 * Redirects user to their home page.
 */
router.get('/', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      `/#${querystring.stringify({
        error: 'state_mismatch',
      })}`,
    );
  } else {
    const { accessToken, refreshToken } = await getAccessToken(code, state);
    // console.log('ACCESS TOKEN:', accessToken);
    // console.log('REFRESH TOKEN:', refreshToken);
    const email = await getUserEmail(accessToken);
    const newSession = await Session.create({
      email,
      authToken: accessToken,
      refToken: refreshToken,
    });

    res.cookie('session-id', newSession.id, {
      /**
       * Cookie expires after 1 hour.
       * Set to (5 * 1000) to see what happens when the cookie expires in 5 seconds.
       * TL;DR it disappears when you refresh the page after 5 seconds.
       * Cookie expiry is in Zulu time in the Chrome browser by default.
       */
      maxAge: (3600 * 1000),
      httpOnly: true,
    });
    res.redirect('http://localhost:9000/profile');
  }
});

module.exports = router;
