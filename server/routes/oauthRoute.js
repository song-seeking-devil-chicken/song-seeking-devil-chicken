const express = require('express');
const querystring = require('qs');
const axios = require('axios');

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
    console.log(error);
    return error;
  }
}

/**
 * Calls getAccessToken().
 * Stores the access and refresh token granted by Spotify.
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
    /**
     * TODO:
     * determine appropriate redirect
     * store access token on server side
     */
    console.log('ACCESS TOKEN:', accessToken);
    console.log('REFRESH TOKEN:', refreshToken);
    res.redirect('http://localhost:9000/profile');
  }
});

module.exports = router;
