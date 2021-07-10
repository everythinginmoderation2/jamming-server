var express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users route is working...');
});

router.post('/refresh', (req, res) => {
  console.log(refreshToken)
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken
  });

  spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body.accessToken,
      expiresIn: data.body.expiresIn,
    })
    console.log('The access token has been refreshed', data.body)
    // spotifyApi.setAccessToken(data.body['access_token']);
  }).catch(err => {
    console.log('Could not refresh token', err)
    res.status(400).send(err)
  })
})

router.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
  });

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      expiresIn: data.body.expires_in,
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token
    })
  }).catch((err)=> {
    res.status(400).send(err)
    console.log(err)
  })
})


module.exports = router;
