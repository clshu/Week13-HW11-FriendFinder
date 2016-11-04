/// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// set PORT to environment variable PORT, if it doesn't exist, set PORT to 3000
// This allows cloud service like heroku to configure its own PORT value
var PORT = process.env.PORT || 3000;
// Use body-parser to parse different content types
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// 'app' is the top of static file directories
app.use(express.static('app'));
// load html and api routing handlers
require('./app/routing/html-routes')(app);
require('./app/routing/api-routes')(app);

// listen to PORT
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

