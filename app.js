var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const spotifyWebApi = require('spotify-web-api-node')
require('dotenv').config()

//require and define routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//setup express server
var app = express();
//middleware
app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

//use routes
app.use('/', indexRouter);
app.use('/auth', usersRouter);

//PORT connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
