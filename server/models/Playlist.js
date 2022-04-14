const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: { type: String, required: true },
  songs: { type: [String], default: [] },
});

module.exports = playlistSchema;
