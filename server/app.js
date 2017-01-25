var express = require('express');
var request = require('request');
var app = express();

app.get('/', function(req, res) {
  res.send('This isn\'t Reddit');
})

app.get('/top', function(req, res) {
	request({
		method: 'GET',
		url: 'https://www.reddit.com/top.json',
	}).pipe(res);
})

app.get('/hot', function(req, res) {
	request({
		method: 'GET',
		url: 'https://www.reddit.com/hot.json',
	}).pipe(res);
})

app.get('/saved', function(req, res) {
	res.send('These are my saved posts');
})

app.post('/saved', function(req, res) {
	res.send('Eventually this will save a post');
})

app.listen(3000, function() {
  console.log('Listening on 3000');
})