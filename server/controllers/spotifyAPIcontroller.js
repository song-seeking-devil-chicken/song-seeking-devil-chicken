const SAPI = require('spotify-web-api-node');

const spotifyAPI = { sessions: {} };

// sessionID : new api instance
// credentials = { clientID, clientSecret, redirectURI }

spotifyAPI.createSession = (sessionID, credentials) => {
  console.log(`new SAPI created for ${sessionID}`);
  spotifyAPI.sessions[sessionID] = new SAPI(credentials);
};

spotifyAPI.deleteSession = (sessionID) => {
  console.log(`SAPI deleted for ${sessionID}`);
  delete spotifyAPI.sessions[sessionID];
};

spotifyAPI.invokeSession = (sessionID) => {
  console.log(`invoking SAPI for ${sessionID}`);
  return spotifyAPI.sessions[sessionID];
};

module.exports = spotifyAPI;

// spotifyAPI.invokeSession(sessionID).getArtistsAlbum
