const express = require('express');
const router = express.Router();
const SAPI = require('../controllers/spotifyAPIcontroller');

router.get('/me', async (req, res, next) => {
  const id = req.cookies['session-id'];
  res.locals.body = await SAPI.invokeSession(id).getMe();
  return next();
});

module.exports = router;