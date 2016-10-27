var express = require('express');
var app = express();
var mongojs = require('mongojs');
var logger = require('morgan');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');


var compress = require('compression'); //Reduce the size of the response body and increase the speed of a Web application
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Get Contact List
app.get('/contactlist', function (req, res) {
    db.contactlist.find(function (err, docs) {
        res.json(docs);
    });
});

// Post Contact List
app.post('/contactlist', function (req, res) {
    db.contactlist.insert(req.body, function (err, docs) {
        res.json(docs);
    });
});


// Delete Contact By Id
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs) {
        res.json(docs);
    });
});


// Get Contact By Id for edit contact
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs) {
        res.json(docs);
    });
});


// Put Contact By Id for update contact
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    delete  req.body._id;
    db.contactlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: req.body},
        new: true
    }, function (err, docs) {
        res.json(docs);
    });
});

app.listen(80);
