const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var data = require('./data.json');

mongoose.connect(process.env.MONGODB_URI);

var User = mongoose.model('User', {
  name: String,
  username: String,
  password: String,
  birthday: Date,
  gender: String
})
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

var Schema = mongoose.Schema;
var VaccineSchema = new Schema({
  "Age": Number,
  "Vaccine": String
})
var Vaccine = mongoose.model('Vaccine', VaccineSchema)
mongoose.Promise = Promise;

// app.post('/load', function(req, res) {
//   Promise.all(
//     data.map((x) => {
//       var newVaccine = {
//         Age: x.Age,
//         Vaccine: x.Vaccine
//       };
//       return new Vaccine(newVaccine).save();
//     })
//   ).then(function(){
//     res.send('Success!');
//   })
// });

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
      // res.redirect('/login/quiz');
    }
  });
});

app.get('/contact/:id', function(req, res){
  User.findById(req.params.id, (err, result) => {
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

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server running at http://localhost:%d/', port);
});
