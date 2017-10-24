var mysql = require('mysql');
var connection = require('./connection');

module.exports.findAll = function(callback) {
	var sql = `
		SELECT blogs.id, blogs.name, blogs.short, blogs.created, users.username
		FROM blogs
		INNER JOIN users ON users.id = blogs.user_id
		ORDER BY id DESC 
	`
	connection.query(sql, callback);
	// connection.query("SELECT * FROM blogs ORDER BY id DESC ", callback);
}

module.exports.add = function(data, callback) {
	var sql = `
		INSERT INTO blogs (user_id, name, description, created) 
		VALUES ("${data.user_id}", "${data.name}", "${data.description}")
	`
	// connection.query(sql, callback);
	connection.query("INSERT INTO blogs SET ?", data, callback);
}

module.exports.findByName = function(name, callback) {
	connection.query("SELECT * FROM blogs WHERE name = '" + name + "'", callback);
}

module.exports.findById = function(id, callback) {
	var sql = `
		SELECT blogs.*, users.username
		FROM blogs
		INNER JOIN users ON users.id = blogs.user_id
		WHERE blogs.id =${id}
	`
	connection.query(sql, callback);
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}