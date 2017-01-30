var express = require('express');
// var controller = require('./controllers/index.js');
var mongoose = require('mongoose');
var request = require('request');

var mongoAddress = 'mongodb://devMongo:27017/easeCen';

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost', function(err) {
    if (err) console.error(err);
    else console.log('mongo connected');
  });
} else {
  mongoose.connect(process.env.mongoAddress, function(err) {
    if (err) console.error(err);
    else console.log('mongo connected');
  });
}


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
    userInfo = parseReq(encodeURI(JSON.parse(JSON.stringify(key)).slice(13)));
  }
  var username = userInfo.username;
  var password = userInfo.password;

  User.find({username: username}, function(err, success) {
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

app.listen(process.env.PORT || 3000);
