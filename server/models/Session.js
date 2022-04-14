const mongoose = require('mongoose');

const { Schema } = mongoose;

// song model
const sessionSchema = new Schema({
  email: { type: String, required: true },
  authToken: { type: String, required: true },
  refToken: { type: String, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
