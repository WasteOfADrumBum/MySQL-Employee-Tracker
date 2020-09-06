const mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "12345678",
	database: "employeesDB",
});

// connect to the mysql server and database
connection.connect(function (err) {
	if (err) throw err;
});

module.exports = connection;
