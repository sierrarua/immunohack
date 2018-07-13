const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var User = mongoose.model('User', {
  name: String,
  username: String,
  password: String,
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
      res.redirect('/enterInfo');
    }
  });
});

app.get('/contact', function(req, res){
  Contact.find({}, (err, result) => {
    if (err) {
      res.status(500).end(err.message);
    } else {
      res.json(result);
    }
  })
})

app.get('/contact/:id', function(req, res){
  Contact.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).end(err.message);
    } else {
      res.json(result);
    }
  })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
