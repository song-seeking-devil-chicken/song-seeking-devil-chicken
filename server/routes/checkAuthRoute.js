const express = require('express');
// const mongoose = require('mongoose');
const Session = require('../models/Session');

const router = express.Router();

/**
 * TODO: Add conditionals to handle situations where the user
 * is not in the sessions database.
 */

router.get('/', async (req, res) => {
  const userSession = await Session.findById(req.cookies['session-id']).exec();
  if (userSession) {
    res.status(200).json({ authenticated: true, accessToken: userSession.authToken });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
