
var friends = require('../data/friends');

module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});
	app.post('/api/friends', function (req, res) {
		var match = findMatch(req.body, friends);
		res.json(match);
	});

	function findDifferences(scores1, scores2) {
		var diffs = 0;
		for (var i = 0; i < scores1.length; i++) {
			diffs += Math.abs(Number(scores1[i]) - Number(scores2[i]));
		}

		return diffs;
	}
	function findMatch(user, friends) {
		// 10 numbers in scores, so larget diffs between 2 arrays
		// is 10 * (5 - 1) = 40, the initial value of lowestDiff
		// should be greater than 40 so any diff will be smaller than
		// initial value and replace the initial value with newly
		// computed diffs
		var lowestDiff = 41; 
		var match = null;

		for (var i = 0; i < friends.length; i++) {
			var diffs = findDifferences(user.scores, friends[i].scores);
			//console.log(friends[i].name + ': ' + diffs);
			if (diffs < lowestDiff) {
				lowestDiff = diffs;
				match = friends[i];
			}
		};

		friends.push(user);
		return match;
	}

}