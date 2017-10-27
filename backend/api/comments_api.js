var express = require('express');
var app = express();


// Import User Module Containing Functions Related To User Data
var comments = require('../models/comments');

// API Routes

app.get('/api/comment/:id', function(req, res) {
	var id = req.params.id;
	comments.findById(id, function(err, rows, fields) {
		// if(err) throw err;
		res.json(rows);
	})
});

app.post('/api/comment/add', function(req, res, next) {
	
	var data = req.body;
	comments.add(data, function(err, info) {
		// if(err) throw err;
		comments.sendResponse(true, res);
	});
});

app.post('/api/comment/delete', function(req, res, next) {
	
	var data = req.body;
	comments.findId(data.id, function(err, rows, fields) {
		if(rows.length !== 1) {
			comments.sendResponse(false, res);
		} else {
			comments.delete(data.id, function(err, info) {
				// if(err) throw err;
				// console.log(info);
				comments.sendResponse(true, res);
			});
		};
	});
});

module.exports = app;
