var mysql = require('mysql');
var connection = require('./connection');

module.exports.findAll = function(callback) {
	var sql = `
		SELECT blogs.id, blogs.name, blogs.short, blogs.created, users.username, users.first_name, users.last_name
		FROM blogs
		INNER JOIN users ON users.id = blogs.user_id
		ORDER BY id DESC
	`
	connection.query(sql, callback);
	// connection.query("SELECT * FROM blogs ORDER BY id DESC ", callback);
}

module.exports.add = function(data, callback) {
	var sql = `INSERT INTO comments SET ?`;
	connection.query(sql, data, callback);
}

module.exports.findById = function(id, callback) {
	var sql = `
		SELECT users.username, users.first_name, users.last_name, users.info, comments.*
		FROM comments
		INNER JOIN blogs ON blogs.id = comments.blog_id
		INNER JOIN users ON users.id = comments.user_id
		WHERE blogs.id =${id}
		ORDER BY comments.id DESC
	`
	connection.query(sql, callback);
}

module.exports.findId = function(id, callback) {
	connection.query("SELECT * FROM comments WHERE id = '" + id + "'", callback);
}

module.exports.delete = function(id, callback) {
	connection.query("DELETE FROM comments WHERE id = '" + id + "'", callback);
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}