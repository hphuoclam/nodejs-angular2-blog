var bcrypt = require('bcrypt');
var mysql = require('mysql');


var connection = mysql.createConnection({
  	host     : 'localhost',
  	user     : 'root',
  	password : 'root',
  	database : 'node_test'
});


connection.connect(function() {
	console.log("Database connected");
});

module.exports.findAll = function(callback) {
	connection.query('SELECT * from users', function(err, rows, fields) {
	  	if (!err)
	    	console.log('The solution is: ', rows);
	  	else
	    	console.log('Error while performing Query.');
	});
	connection.query("SELECT * FROM users ORDER BY id DESC", callback);
}

module.exports.addUser = function(data, callback) {
	connection.query("INSERT INTO users SET ?", data, callback);
}

module.exports.findByUsername = function(username, callback) {
	connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
}

module.exports.encrypt = function(data, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(data.password, salt, callback);
	})
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}