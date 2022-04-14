const SAPI = require('spotify-web-api-node');

const spotifyAPI = { sessions: {} };

/**
 * sessionId:
 *  Derived from the cookie during the user's active session.
 * credentials:
 *  Credentials from our Spotify Web Application: { clientID, clientSecret, redirectURI }
 */

/**
 * @param {String} sessionId
 * @param {Object} credentials
 * @returns {null}
 * Creates a new SAPI session using a user's session ID (derived from cookie)
 * and credentials from the Spotify Web Application created via
 * developers.spotify.com.
 */
spotifyAPI.createSession = (sessionId, credentials) => {
  console.log(`creating SAPI for ${sessionId}`);
  spotifyAPI.sessions[sessionId] = new SAPI(credentials);
  return null;
};

/**
 * @param {String} sessionId
 * @returns {null}
 * Deletes a SAPI object from memory when a user signs out.
 */
spotifyAPI.deleteSession = (sessionId) => {
  console.log(`deleting SAPI for ${sessionId}`);
  delete spotifyAPI.sessions[sessionId];
  return null;
};

/**
 * @param {*} sessionId
 * @returns {spotifyAPI}
 * Returns a user's personal SAPI object so that they can make a
 * request to the Spotify API via the Node.js Spotify wrapper.
 */
spotifyAPI.invokeSession = (sessionId) => {
  console.log(`invoking SAPI for ${sessionId}`);
  return spotifyAPI.sessions[sessionId];
};

module.exports = spotifyAPI;
