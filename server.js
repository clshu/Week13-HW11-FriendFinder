/// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
// files in subdirs
var friends = require('./app/data/friends');
//var htmlRoutes = require('./app/routing/html-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('app'));

require('./app/routing/html-routes')(app);

app.get('/api/friends', function (req, res) {
	res.json(friends);
});

app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

