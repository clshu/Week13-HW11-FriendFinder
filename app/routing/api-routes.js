
var friends = require('../data/friends');
//
// Handlers to serve API requests from frontend
// and send results back to frontend
//
module.exports = function (app) {
	// GET "/api/friends". List all friends
	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});
	//
	//  POST "/api/friends". 
	//  Find a friend that has lowest difference between user and the friend
	// 	and send back best match back to the client side.
	//	Also save user to friends data array
	// 
	app.post('/api/friends', function (req, res) {
		var match = findMatch(req.body, friends);
		res.json(match);
	});

	//
	// Find the differences between 2 scores
	// It's the sum of the absolute value of the 
	// difference between the corresponding single score
	// in score1 and scores2
	// e.g. 
	// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
	// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
	// Total Difference: 2 + 1 + 2 = 5
	//
	function findDifferences(scores1, scores2) {
		var diffs = 0;
		for (var i = 0; i < scores1.length; i++) {
			diffs += Math.abs(Number(scores1[i]) - Number(scores2[i]));
		}

		return diffs;
	}
	//
	// Iterate friends data, and find a friend that has the lowest differences
	// between user and the friend as the best match. Save user in the
	// friends data array, and return the best match
	//
	function findMatch(user, friends) {
		// 10 numbers in scores, each number is between 1 and 5,
		// so larget diff between 2 arrays
		// is 10 * (5 - 1) = 40, the initial value of lowestDiff
		// should be greater than 40 so any newly computed diff
		// will be smaller than initial value and replace it.
		var lowestDiff = 41; 
		var match = null;

		for (var i = 0; i < friends.length; i++) {
			var diffs = findDifferences(user.scores, friends[i].scores);
			// if diffs has lower number, set it to lowestDiff
			// set this friend as match
			if (diffs < lowestDiff) {
				lowestDiff = diffs;
				match = friends[i];
			}
		};
		// Save user
		friends.push(user);
		return match;
	}

}