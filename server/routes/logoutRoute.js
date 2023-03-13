const express = require('express');
const Session = require('../models/Session');
const spotifyAPIcontroller = require('../controllers/spotifyAPIcontroller');

const router = express.Router();

router.get('/', async (req, res) => {
  await Session.findByIdAndDelete(req.cookies['session-id']);
  spotifyAPIcontroller.deleteSession(req.cookies['session-id']);
  res.clearCookie('session-id');
  res.status(200).json({ authenticated: false });
});

module.exports = router;
