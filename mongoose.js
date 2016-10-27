var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/contactlist');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: {type: String, required: true},
  email: String,
  number: String
}, {collection: 'contactlist'});

var UserData = mongoose.model('UserData', userDataSchema);

// Reduce the size of the response body and increase the speed of a Web application
var compress = require('compression');
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Get Contact List
app.get('/contactlist', function (req, res) {

    UserData.find()
    .then(function(docs) {
        res.json(docs);
    });
});

// Post Contact List
app.post('/contactlist', function (req, res) {

  var data = new UserData(req.body);
  data.save();
  res.json(data);


});


// Delete Contact By Id
app.delete('/contactlist/:id', function (req, res) {

  var id = req.params.id;
  var data = UserData.findByIdAndRemove(id).exec();
  res.json(data);

});


// Get Contact By Id for edit contact
app.get('/contactlist/:id', function (req, res) {

    var id = req.params.id;

    UserData.findById(id, function(err, doc) {
        if (err) {
          console.error('error, no entry found');
      }
      res.json(doc);
  })
 
});


// Put Contact By Id for update contact
app.put('/contactlist/:id', function (req, res) {

    var id = req.params.id;

    UserData.findById(id, function(err, doc) {
        if (err) {
          console.error('error, no entry found');
      }
      doc.name = req.body.name;
      doc.email = req.body.email;
      doc.number = req.body.number;
      doc.save();

      res.json(doc);
  })
 
});

app.listen(80);
