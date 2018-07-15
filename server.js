const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var Token = mongoose.model('token', {
  userId: String,
  token: String,
  createdAt: Date
});

var User = mongoose.model('User', {
  name: String,
  username: String,
  password: String,
  birthday: Date,
  gender: String
})

var FamilyMember = mongoose.model('FamilyMember', {
  name: String,
  birthday: Date,
  gender: String
})

var Vaccine = mongoose.model('Vaccine', {
  name: String,
  age: Number,
  dose_frequency: Number
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/register', function(req, res){
  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    birthday: req.body.birthday,
    gender: req.body.gender
  });
  newUser.save({}, function(error, results){
    if (error) {
      console.log("error", error);
    } else {
      res.send(results);
    }
  });
})

app.post('/login', function(req, res){
  User.find({username: req.body.username, password: req.body.password}, function(err, docs) {
    if (err) {
      throw err;
    } else {
      var newToken = new Token({
        userId: docs[0]._id,
        token: docs[0].username + String(new Date()),
        createdAt: new Date()
      });
      newToken.save({}, function(error, results){
        if (error) {
          console.log("error", error);
        } else {
          res.send(results);
        }
      });
    }
  });
});

app.post('/login/addFamilyMember', function(req, res){
  Token.find({token: req.query.token}, function(err, docs) {
    if (err) {
      throw err;
    } else if (!docs.length){
      res.status(400).send("token not found");
    } else {
      var newFamilyMember = new FamilyMember({
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender
      });
      newFamilyMember.save({}, function(error, results){
        if (error) {
          console.log("error", error);
        } else {
          res.send(results);
        }
      });
    }
  });
})

app.get('/suggestions', function(req,res){
  User.findOne({
      username: req.query.username
  }, function(err, results){
    if (err) {
      res.send('did not find any users corresponding to this name');
    } else {
      var today = new Date();
      console.log(results)
      var ageMs = today.getTime() - results.birthday.getTime();
      var UserAgeInDays = ( Math.ceil(ageMs / (1000 * 60 * 60 * 24)));
      console.log(UserAgeInDays)
      Vaccine.find({}, function(err, results){
        var filteredResults = results.filter(result => UserAgeInDays > result.toObject().Age)
        console.log(filteredResults.length)
        return filteredResults
      })
    }
  })
});

app.get('/userProfiles', function(req, res) {
    User.find({}, function(err, user) {
        if(!user) {
            return false
        } else {
            console.log(user)
            res.json(user)
        }
    })
})


app.listen(process.env.PORT || 1337);
