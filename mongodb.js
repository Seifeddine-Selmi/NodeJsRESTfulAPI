var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var logger = require('morgan');
var assert = require('assert');

var url = 'mongodb://localhost:27017/contactlist';

var bodyParser = require('body-parser');

// Reduce the size of the response body and increase the speed of a Web application
var compress = require('compression');
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Get Contact List
app.get('/contactlist', function (req, res) {
 
 var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('contactlist').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.json(resultArray);
 
    });
  });


});

// Post Contact List
app.post('/contactlist', function (req, res) {
   
  var user = {
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('contactlist').insertOne(user, function(err, result) {
      assert.equal(null, err);
      console.log('User inserted');
      db.close();
      res.json(result);
    });
  });

});


// Delete Contact By Id
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
   
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('contactlist').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('User deleted');
       res.json(result);
      db.close();
    });
  });
});




// Get Contact By Id for edit contact
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
   
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('contactlist').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('User selected');
       res.json(result);
      db.close();
    });
  });
});


// Put Contact By Id for update contact
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  
  var user = {
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  };


  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('contactlist').updateOne({"_id": objectId(id)}, {$set: user}, function(err, result) {
      assert.equal(null, err);
      console.log('User updated');
      res.json(result);
      db.close();
    });
  });
});

app.listen(80);
