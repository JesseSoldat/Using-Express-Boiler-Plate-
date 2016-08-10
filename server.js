'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
require('dotenv').config();
require('./app/config/passport.js')(passport);
var port = process.env.PORT || 8080;
var path = process.cwd();

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(path + '/app/controllers'));
app.use('/public', express.static(path + '/public'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
	// console.log(process.env.MONGO_URI);
	// console.log(path);

});
