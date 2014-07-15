var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

config.routes.init( app );

app.listen( config.application.port );