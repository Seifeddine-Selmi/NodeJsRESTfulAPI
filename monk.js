var express = require('express');
var app = express();
var mongojs = require('mongojs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('monk')('localhost:27017/contactlist');
var userData  = db.get('contactlist');


// Reduce the size of the response body and increase the speed of a Web application
var compress = require('compression');
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Get Contact List
app.get('/contactlist', function (req, res) {

   userData.find({}).then(function(docs) {
        res.json(docs);
    });
 
});

// Post Contact List
app.post('/contactlist', function (req, res) {
   
   userData.insert(req.body).then(function (doc) {
     res.json(doc); 
   });

});


// Delete Contact By Id
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
   
   // userData.remove({"_id": db.id(id)});
    userData.removeById(id).then(function (doc) {
      res.json(doc); 
    });
 
});


// Get Contact By Id for edit contact
app.get('/contactlist/:id', function (req, res) {

    var id = req.params.id;
    userData.find({"_id": db.id(id)}).then(function (doc) {
      res.json(doc); 
    });
});


// Put Contact By Id for update contact
app.put('/contactlist/:id', function (req, res) {

    var id = req.params.id;
    userData.updateById(id, req.body).then(function (doc) {
      res.json(doc); 
    });
});

app.listen(80);
