var express = require('express');
var mongoose = require('mongoose');
var request = require('request');

// connect to mongolabs URI
mongoose.connect("mongodb://heroku_8l4vnv2b:45bfmjg7at8a27c76kpn3rppat@ds137149.mlab.com:37149/heroku_8l4vnv2b", function (err, database) {
  if (err) throw err;
  var server = app.listen(process.env.PORT || 3000);
  console.log("Express server started on port %s", server.address().port);
});

// db schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  username: String,
  password: String,
  posts: [],
});

var User = mongoose.model('user', UserSchema);

var app = express();
app.use(express.static(__dirname + '/../client'));

// helper 
var parseReq = function(key) {
  var parseObj = {};
  parseObj.username = key.slice(0, key.indexOf('%22'));
  key = key.slice(parseObj.username.length + 22);
  parseObj.password = key.slice(0, key.indexOf('%22'));
  return parseObj;
};

app.get('/top*', function(req, res){
  request.get('https://www.reddit.com/top.json').pipe(res)
});

app.get('/hot*', function(req, res){
  request.get('https://www.reddit.com/hot.json').pipe(res)
});

app.get('/saved*', function(req, res) {
  var username = req.headers.username;

  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log('err finding user');
      res.end();
    }
    res.end(JSON.stringify(user.posts));
  })
});

// verify login
app.get('/user*', function(req, res) {
  var userInfo;
  for (var key in req.query) {
    console.log('login query: ', encodeURI(JSON.parse(JSON.stringify(key))));
    userInfo = parseReq(encodeURI(JSON.parse(JSON.stringify(key)).slice(13)));
  }
  var username = userInfo.username;
  var password = userInfo.password;
  console.log('username: ', username);
  console.log('password: ', password);

  User.find({username: username}, function(err, success) {
    console.log('success: ', success);
    if (err) { 
      console.log('finduser error: ', err)
      res.end();
    }
    if (success.length) {
      User.find({username: username, password: password}, function(err, user) {
        if (err) { 
          console.log('verifyLogin err', err)
          res.end()
        }
        if (user.length) {  
          res.end(username);
        } else {
          console.log('username and password did not match')
          res.end('no match');
        }
      })
    } else {
      var newUser = new User();
      newUser.username = username;
      newUser.password = password;
      newUser.posts = [];

      newUser.save(function(err, success) {
        if (err) {
          console.log('addUser error: ', err)
        }
        console.log('new user success: ', success);
        res.end(username);
      });
    }
  })
});

// update saved posts
app.get('/post*', function(req, res) {
  var username = req.headers.username;
  var post = JSON.parse(decodeURI(req.headers.postcontent));

  User.findOne({username: username}, function(err, success) {
    if (err) {
      console.log('err finding user');
      res.end();
    }
    var userPosts = success.posts;
    userPosts.unshift(post);
    var update = {posts: userPosts};

    User.update({username: username}, {$set: update}, function(err) {
      if (err) {
        console.log('could not update posts')
        res.end();
      }
      res.status(200).end();
    })
  })
});

