var express = require('express');
var app = express();
var jwt    = require('jsonwebtoken');
var bcrypt = require('bcrypt');

app.set('superSecret', 'blogangularnodejs');


// Import User Module Containing Functions Related To User Data
var user = require('../models/user');

// API Routes
app.get('/', function(req, res) {
	user.findAll(function(err, rows, fields) {
		// if(err) throw err;
		res.json(rows);
	})
});

app.post('/adduser', function(req, res, next) {
	
	var data = req.body;
	user.findByUsername(data.username, function(err, rows, fields) {
		if(rows.length == 1) {
			user.sendResponse(false, res);
		} else {
			user.encrypt(data, function(err, hash) {
				data.hashedpassword = hash;
				delete data.password;
				user.addUser(data, function(err, info) {
					// if(err) throw err;
					// console.log(info);
					user.sendResponse(true, res);
				});
			});
		};
	});
});

app.post('/deleteuser', function(req, res, next) {
	
	var data = req.body;
	user.findByUsername(data.username, function(err, rows, fields) {
		if(rows.length !== 1) {
			user.sendResponse(false, res);
		} else {
			user.deleteUser(data.username, function(err, info) {
				// if(err) throw err;
				// console.log(info);
				user.sendResponse(true, res);
			});
		};
	});
});


app.post('/login', function(req, res, next) {
	
	var data = req.body;
	user.findByUsername(data.username, function(err, rows, fields) {
		if(rows.length !== 1) {
			user.sendResponse(false, res);
		} else {
			var str = JSON.stringify(rows);
	        rows = JSON.parse(str);
	        if(rows.length > 0){
	        	var compare = bcrypt.compare(data.password, rows[0].hashedpassword, function(err, resp) {
				    if(resp){
				    	var payload = {
							username: data.username,	
						}
						var token = jwt.sign(payload, app.get('superSecret'), {
							expiresIn: 86400 // expires in 24 hours
						});
						delete rows[0].hashedpassword;
						rows[0].token = token;
						res.json({
							success: true,
							user: rows[0]
						});
				    }else{
				    	user.sendResponse(false, res);
				    }
				});
	        }else{
	        	user.sendResponse(false, res);
	        }
		};
	});
});

module.exports = app;
