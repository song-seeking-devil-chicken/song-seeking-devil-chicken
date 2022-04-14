const api = require('spotify-web-api-js');

const spotifyAPI = { sessions: {} };

// sessionID : new api instance
// credentials = { clientID, clientSecret, redirectURI }

spotifyAPI.createSession = (sessionID, credentials) => {
  spotifyAPI.sessions[sessionID] = new api(credentials);
}

spotifyAPI.invokeSession = (sessionID) => {
  return spotifyAPI.sessions[sessionID];
}

module.exports = spotifyAPI;

// spotifyAPI.invokeSession(sessionID).getArtistsAlbum
