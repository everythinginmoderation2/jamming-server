var express = require('express');
var router = express.Router();
const lyricsFinder = require("lyrics-finder")

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).send('index router is working...');
});

router.get('/lyrics', async (req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No lyrics found"
  res.json({lyrics})
})

module.exports = router;
