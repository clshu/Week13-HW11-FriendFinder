var path = require('path');

//
// Handlers to serve html pages to the frontend
//
module.exports = function (app) {

	// GET '/survey', send survey.html to frontend
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});
	// Default USE route '/', send home.html to frontend
	// This route should be the last route of GET/POST routes
	app.use('/', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}