// === ╔══════════╗ ===
// === ║ REQUIRED ║ ===
// === ╚══════════╝ ===

const inquirer = require("inquirer");
const table = require("console.table");
// MySQL Connection
const connection = require("./config/connection");
// Prompts
const prompt = require("./config/prompts");
require("console.table");

// === ╔════════════════╗ ===
// === ║ INITIALIZE APP ║ ===
// === ╚════════════════╝ ===

/* === || START APPLICATION || === */
// banner
console.log(`╔═════════════════════════════════════════════════════╗
║                                                     ║
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);
// launch app
firstPrompt();

/* === || INITIAL PROMPT || === */
function firstPrompt() {
	// Main Menu
	inquirer.prompt(prompt.firstPrompt).then(function ({ task }) {
		switch (task) {
			case "View Employees":
				viewEmployee();
				break; // ⛔
			case "View Employees by Manager":
				viewEmployeeByManager();
				break; // ⛔
			case "View Employees by Department":
				viewEmployeeByDepartment();
				break; // ⛔
			case "View Departments":
				viewDepartments();
				break; // ⛔
			case "View Roles":
				viewRoles();
				break; // ⛔
			case "View Department Budget":
				viewDepartmentBudget();
				break; // ⛔
			case "Add Employee":
				addEmployee();
				break; // ⛔
			case "Add Department":
				addDepartment();
				break; // ⛔
			case "Add Role":
				addRole();
				break; // ⛔
			case "Update Employee Role":
				updateEmployeeRole();
				break; // ⛔
			case "Update Employee Manager":
				updateEmployeeManager();
				break; // ⛔
			case "Remove Employee":
				deleteEmployee();
				break; // ⛔
			case "Remove Department":
				deleteDepartment();
				break; // ⛔
			case "Remove Role":
				deleteRole();
				break; // ⛔
			case "Exit":
				connection.end();
				break; // ⛔
		}
	});
}

// === ╔════════════════╗ ===
// === ║ VIEW FUNCTIONS ║ ===
// === ╚════════════════╝ ===

/* === || VIEW EMPLOYEES || === */
function viewEmployee() {
	console.log("Employee Rota:\n");

	var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		console.table(res);
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		firstPrompt();
	});
}

/* === || VIEW EMPLOYEE BY MANAGER || === */
function viewEmployeeByManager() {
	console.log("Manager Rota:\n");

	var query = `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
	ON e.role_id = r.id
  	LEFT JOIN department d
  	ON d.id = r.department_id
  	LEFT JOIN employee m
	ON m.id = e.manager_id GROUP BY e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		// Select manager to view subordinates
		const managerChoices = res
			// Filter NULL (prevents selecting employees with no assigned manager)
			.filter((mgr) => mgr.manager_id)
			.map(({ manager_id, manager }) => ({
				value: manager_id,
				name: manager,
			}));

		promptManager(managerChoices);
	});
}

/* === || PROMPT EMPLOYEE BY MANAGER || === */
function promptManager(managerChoices) {
	inquirer
		.prompt(prompt.viewManagerPrompt(managerChoices))
		.then(function (answer) {
			var query = `SELECT e.id, e.first_name, e.last_name, r.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
			FROM employee e
			JOIN role r
			ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			LEFT JOIN employee m
			ON m.id = e.manager_id
			WHERE m.id = ?`;

			connection.query(query, answer.managerId, function (err, res) {
				if (err) throw err;

				console.table("\nManager's subordinates:", res);
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || VIEW EMPLOYEE BY DEPARTMENT || === */
function viewEmployeeByDepartment() {
	console.log("View employees by department\n");

	var query = `SELECT d.id, d.name
	FROM employee e
	LEFT JOIN role r
	ON e.role_id = r.id
	LEFT JOIN department d
	ON d.id = r.department_id
	GROUP BY d.id, d.name`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		// Select department
		const departmentChoices = res.map((data) => ({
			value: data.id,
			name: data.name,
		}));

		promptDepartment(departmentChoices);
	});
}

/* === || PROMPT EMPLOYEE BY DEPARTMENT || === */
function promptDepartment(departmentChoices) {
	inquirer
		.prompt(prompt.departmentPrompt(departmentChoices))
		.then(function (answer) {
			var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
			FROM employee e
			JOIN role r
				ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			WHERE d.id = ?`;

			connection.query(query, answer.departmentId, function (err, res) {
				if (err) throw err;

				console.table("\nDepartment Rota: ", res);
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || VIEW DEPARTMENTS || === */
function viewDepartments() {
	var query = "SELECT * FROM department";
	connection.query(query, function (err, res) {
		console.log(`\nDEPARTMENTS:\n`);
		res.forEach((department) => {
			console.log(`ID: ${department.id} | ${department.name} Department`);
		});
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
		firstPrompt();
	});
}

/* === || VIEW ROLES || === */
function viewRoles() {
	var query = "SELECT * FROM role";
	connection.query(query, function (err, res) {
		console.log(`\nROLES:\n`);
		res.forEach((role) => {
			console.log(
				`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,
			);
		});
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
		firstPrompt();
	});
}

/* === || VIEW DEPARTMENT BUDGET || === */
function viewDepartmentBudget() {
	var query = `SELECT d.name, 
		r.salary, sum(r.salary) AS budget
		FROM employee e 
		LEFT JOIN role r ON e.role_id = r.id
		LEFT JOIN department d ON r.department_id = d.id
		group by d.name`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		console.log(`\nDEPARTMENT BUDGETS:\n`);
		res.forEach((department) => {
			console.log(
				`Department: ${department.name}\n Budget: ${department.budget}\n`,
			);
		});
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
		firstPrompt();
	});
}

// === ╔═══════════════╗ ===
// === ║ ADD FUNCTIONS ║ ===
// === ╚═══════════════╝ ===

/* === || ADD EMPLOYEE || === */
const addEmployee = () => {
	// Select Employee's Department
	let departmentArray = [];
	connection.query(`SELECT * FROM department`, (err, res) => {
		res.forEach((element) => {
			departmentArray.push(`${element.id} ${element.name}`);
		});
		// Select Employee's Role
		let roleArray = [];
		connection.query(`SELECT id, title FROM role`, (err, res) => {
			res.forEach((element) => {
				roleArray.push(`${element.id} ${element.title}`);
			});
			// Select Employee's Manager
			let managerArray = [];
			connection.query(
				`SELECT id, first_name, last_name FROM employee`,
				(err, res) => {
					res.forEach((element) => {
						managerArray.push(
							`${element.id} ${element.first_name} ${element.last_name}`,
						);
					});
					// Create New Employee
					inquirer
						.prompt(
							prompt.insertEmployee(departmentArray, roleArray, managerArray),
						)
						.then((response) => {
							// Insert chosen elements into employee array
							let roleCode = parseInt(response.role);
							let managerCode = parseInt(response.manager);
							connection.query(
								"INSERT INTO employee SET ?",
								{
									first_name: response.firstName,
									last_name: response.lastName,
									role_id: roleCode,
									manager_id: managerCode,
								},
								(err, res) => {
									if (err) throw err;
									console.log("\n" + res.affectedRows + " employee created");
									console.log(
										"\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n",
									);
									viewEmployee();
								},
							);
						});
				},
			);
		});
	});
};

/* === || ADD DEPARTMENT || === */
function addDepartment() {
	inquirer.prompt(prompt.insertDepartment).then(function (answer) {
		var query = "INSERT INTO department (name) VALUES ( ? )";
		connection.query(query, answer.department, function (err, res) {
			console.log(
				`You have added this department: ${answer.department.toUpperCase()}.`,
			);
		});
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
		viewDepartments();
	});
}

/* === || ADD ROLE || === */
function addRole() {
	var query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`;

	connection.query(query, function (err, res) {
		if (err) throw err;
		// Select department for role
		const departmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		promptAddRole(departmentChoices);
	});
}

/* === || PROMPT ADD ROLE || === */
function promptAddRole(departmentChoices) {
	inquirer.prompt(prompt.insertRole(departmentChoices)).then(function (answer) {
		var query = `INSERT INTO role SET ?`;
		// Insert Title, Salary and Department into Role Array
		connection.query(
			query,
			{
				title: answer.roleTitle,
				salary: answer.roleSalary,
				department_id: answer.departmentId,
			},
			function (err, res) {
				if (err) throw err;

				console.log("\n" + res.affectedRows + " role created");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				viewRoles();
			},
		);
	});
}

// === ╔══════════════════╗ ===
// === ║ UPDATE FUNCTIONS ║ ===
// === ╚══════════════════╝ ===

/* === || UPDATE EMPLOYEE ROLE || === */
const updateEmployeeRole = () => {
	// Select Employee to update
	let employees = [];
	connection.query(
		`SELECT id, first_name, last_name
  FROM employee`,
		(err, res) => {
			res.forEach((element) => {
				employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
			// Select employee's new role
			let job = [];
			connection.query(`SELECT id, title FROM role`, (err, res) => {
				res.forEach((element) => {
					job.push(`${element.id} ${element.title}`);
				});
				inquirer.prompt(prompt.updateRole(employees, job)).then((response) => {
					// Update Employee with Chosen Role
					let idCode = parseInt(response.update);
					let roleCode = parseInt(response.role);
					connection.query(
						`UPDATE employee SET role_id = ${roleCode} WHERE id = ${idCode}`,
						(err, res) => {
							if (err) throw err;

							console.log(
								"\n" + "\n" + res.affectedRows + " Updated successfully!",
							);
							console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
							firstPrompt();
						},
					);
				});
			});
		},
	);
};

/* === || UPDATE MANAGER || === */
const updateEmployeeManager = () => {
	// Select Employee to update
	let employees = [];
	connection.query(
		`SELECT id, first_name, last_name
  FROM employee`,
		(err, res) => {
			res.forEach((element) => {
				// for each ID and Name push into array
				employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
			// Select employee's new manager
			inquirer.prompt(prompt.updateManager(employees)).then((answer) => {
				// parseInt prompt answers
				let idCode = parseInt(answer.update);
				let managerCode = parseInt(answer.manager);
				connection.query(
					// replace employee's mgr_ID with emp_ID of new manager
					`UPDATE employee SET manager_id = ${managerCode} WHERE id = ${idCode}`,
					(err, res) => {
						if (err) throw err;

						console.log(
							"\n" + "\n" + res.affectedRows + " Updated successfully!",
						);
						console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
						firstPrompt();
					},
				);
			});
		},
	);
};

// === ╔══════════════════╗ ===
// === ║ REMOVE FUNCTIONS ║ ===
// === ╚══════════════════╝ ===

/* === || REMOVE EMPLOYEE || === */
function deleteEmployee() {
	console.log("Deleting an employee");

	var query = `SELECT e.id, e.first_name, e.last_name
      FROM employee e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
		// Select Employee to remove
		const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
			value: id,
			name: `${id} ${first_name} ${last_name}`,
		}));

		promptDeleteEmployee(deleteEmployeeChoices);
	});
}

/* === || PROMPT REMOVE EMPLOYEE || === */
function promptDeleteEmployee(deleteEmployeeChoices) {
	inquirer
		.prompt(prompt.deleteEmployeePrompt(deleteEmployeeChoices))
		.then(function (answer) {
			var query = `DELETE FROM employee WHERE ?`;
			// after prompting, remove item from the db
			connection.query(query, { id: answer.employeeId }, function (err, res) {
				if (err) throw err;

				console.log("\n" + res.affectedRows + "  employee deleted");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || REMOVE DEPARTMENT || === */
function deleteDepartment() {
	console.log("\nRemove a Department:\n");

	var query = `SELECT e.id, e.name FROM department e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
		// Select Department to Remove
		const deleteDepartmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		promptDeleteDepartment(deleteDepartmentChoices);
	});
}

/* === || PROMPT REMOVE DEPARTMENT || === */
function promptDeleteDepartment(deleteDepartmentChoices) {
	inquirer
		.prompt(prompt.deleteDepartmentPrompt(deleteDepartmentChoices))
		.then(function (answer) {
			var query = `DELETE FROM department WHERE ?`;
			// after prompting, remove item from the db
			connection.query(query, { id: answer.departmentId }, function (err, res) {
				if (err) throw err;

				console.log("\n" + res.affectedRows + " department deleted");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				viewDepartments();
			});
		});
}

/* === || REMOVE ROLE || === */
function deleteRole() {
	console.log("Deleting a role");

	var query = `SELECT e.id, e.title, e.salary, e.department_id FROM role e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
		// Select Role to Remove
		const deleteRoleChoices = res.map(({ id, title }) => ({
			value: id,
			name: `${id} ${title}`,
		}));

		promptDeleteRole(deleteRoleChoices);
	});
}

/* === || PROMPT REMOVE ROLE || === */
function promptDeleteRole(deleteRoleChoices) {
	inquirer
		.prompt(prompt.deleteRolePrompt(deleteRoleChoices))
		.then(function (answer) {
			var query = `DELETE FROM role WHERE ?`;
			// after prompting, remove item from the db
			connection.query(query, { id: answer.roleId }, function (err, res) {
				if (err) throw err;

				console.log("\n" + res.affectedRows + " role deleted");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				viewRoles();
			});
		});
}
