const fetch = require('node-fetch'); // required v2 of node-fetch to use fetch
const Song = require('../models/Songs');
require('dotenv').config();

const controllers = {

  async addSong(req, res, next) {
    try {
      const {
        track,
        trackId,
        artist,
        previewLink,
        dataObj,
      } = req.body;

      const newSong = await Song.create({
        track,
        trackId,
        artist,
        previewLink,
        dataObj,
      });

      res.locals.newSong = newSong;

      return next();
    } catch (err) {
      return next({
        log: err,
        message: {
          err: 'controllers.addSong ERROR: check server logs for details',
        },
      });
    }
  },

  async getSongList(req, res, next) {
    try {
      const allSongs = await Song.find();
      const songArray = [];
      allSongs.forEach((el) => {
        songArray.push(el.trackId);
      });
      res.locals.songArray = songArray;
      return next();
    } catch (err) {
      return next({
        log: err,
        message: {
          err: 'controllers.getSongList ERROR: check server logs for details',
        },
      });
    }
  },

  getId(req, res, next) {
    // how to use the spotify web api reference to search and send back an appropriate ID
    // store the id in res.locals
    return next();
  },

  getSong(req, res, next) {
    const id = '6rqhFgbbKwnb9MLmUQDhG6';
    fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${userAccessToken}`
        Authorization: `Bearer ${process.env.CLIENT_ID}`,
      },
    })
      .then((response) => response.json());
    return next();
  },

};

module.exports = controllers;
