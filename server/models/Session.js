const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * n.b. email does not have to be unique in the case that
 * the user signs in to Song Seeking Devil Chicken on multiple
 * devices.
 */
const sessionSchema = new Schema({
  email: { type: String, required: true },
  authToken: { type: String, required: true },
  refToken: { type: String, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
