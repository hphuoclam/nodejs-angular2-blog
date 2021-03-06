var express = require('express');
var app = express();


// Import User Module Containing Functions Related To User Data
var blogs = require('../models/blogs');

// API Routes
app.get('/api/blogs', function(req, res) {
	blogs.findAll(function(err, rows, fields) {
		// if(err) throw err;
		res.json(rows);
	})
});

app.get('/api/blogs/:id', function(req, res) {
	var id = req.params.id;
	blogs.findById(id, function(err, rows, fields) {
		// if(err) throw err;
		res.json(rows);
	})
});

app.post('/api/blogs/like', function(req, res, next) {
	
	var data = req.body;
	blogs.findById(data.id, function(err, rows, fields) {
		if(rows.length === 0) {
			blogs.sendResponse(false, res);
		} else {
			var str = JSON.stringify(rows);
	        rows = JSON.parse(str);
			var like = {like: rows[0].like += 1}
			blogs.update(like, data.id, function(err, info) {
				// if(err) throw err;
				blogs.sendResponse(true, res);
			});
		};
	});
});

// app.post('/api/blogs/add', function (req, res) {
//   	// console.log(data)
//   	console.log(req.body);
//     console.log(req.files);
// });

app.post('/api/blogs/add', function(req, res, next) {
	
	var data = req.body;
	blogs.findByName(data.name, function(err, rows, fields) {
		if(rows.length == 1) {
			blogs.sendResponse(false, res);
		} else {
			blogs.add(data, function(err, info) {
				// if(err) throw err;
				blogs.sendResponse(true, res);
			});
		};
	});
});

module.exports = app;
