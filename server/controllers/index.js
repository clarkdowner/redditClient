const request = require('request');


module.exports = {
	top: {
		get: function(req, res) {
			request({
				method: 'GET',
				url: 'https://www.reddit.com/top.json',
			}).pipe(res);
	},

	hot: {
		get: function(req, res) {
			request({
				method: 'GET',
				url: 'https://www.reddit.com/hot.json',
			}).pipe(res);
	},

	// db queries
	saved: {
		get: function() {},
		put: function() {},
	},
};