var path = require('path');

//
// Handlers to serve html pages to the frontend
//
module.exports = function (app) {
	// GET '/', send home.html to frontend
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
	// GET '/survey', send survey.html to frontend
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

}