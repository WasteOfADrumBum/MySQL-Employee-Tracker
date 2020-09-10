const mysql = require("mysql");
var connection = mysql.createConnection({
	// Connection
	host: "localhost",
	port: 3306,
	// MySQL Workbench
	user: "root",
	password: "12345678",
	// Database created in schemea.sql
	database: "employeesDB",
});

// connect to the mysql server and database
connection.connect(function (err) {
	if (err) throw err;
});

module.exports = connection;
