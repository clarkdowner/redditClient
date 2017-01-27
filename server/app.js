var express = require('express');
var controller = require('./controllers/index.js');

var app = express();


app.use(express.static(__dirname + '/../client'));

app.get('/top*', controller.top);

app.get('/hot*', controller.hot);

app.get('/saved*', controller.saved.get);

app.put('/saved*', controller.saved.put);


app.listen(3000, function() {
  console.log('Listening on 3000');
})