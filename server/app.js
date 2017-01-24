var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('This isn\'t Reddit');
})

app.get('/hot', function(req, res) {
	res.send('These posts are hot');
})

app.get('/top', function(req, res) {
	res.send('These are the top posts');
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