// === ╔══════════╗ ===
// === ║ REQUIRED ║ ===
// === ╚══════════╝ ===

const inquirer = require("inquirer");
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
	console.log("Viewing employees\n");

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
		console.log("Employees viewed!\n");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		firstPrompt();
	});
}

/* === || VIEW EMPLOYEE BY MANAGER || === */
function viewEmployeeByManager() {
	console.log("Viewing managers\n");

	var query = `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
	ON e.role_id = r.id
  	LEFT JOIN department d
  	ON d.id = r.department_id
  	LEFT JOIN employee m
	ON m.id = e.manager_id GROUP BY e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		const managerChoices = res
			.filter((mgr) => mgr.manager_id)
			.map(({ manager_id, manager }) => ({
				value: manager_id,
				name: manager,
			}));

		console.table(res);
		console.log("Management view succeed!\n");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptManager(managerChoices);
	});
}

/* === || PROMPT EMPLOYEE BY MANAGER || === */
function promptManager(managerChoices) {
	inquirer
		.prompt(prompt.viewManagerPrompt(managerChoices))
		.then(function (answer) {
			console.log("answer ", answer.manager_Id);

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

				console.table("response ", res);
				console.log(res.affectedRows + "Employees are viewed!");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || VIEW EMPLOYEE BY DEPARTMENT || === */
function viewEmployeeByDepartment(departmentChoices) {
	console.log("Viewing employees by department\n");

	var query = `SELECT d.id, d.name
	FROM employee e
	LEFT JOIN role r
	ON e.role_id = r.id
	LEFT JOIN department d
	ON d.id = r.department_id
	GROUP BY d.id, d.name`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		const departmentChoices = res.map((data) => ({
			value: data.id,
			name: data.name,
		}));

		console.table(res);
		console.log("Department view succeed!");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptDepartment(departmentChoices);
	});
}

/* === || PROMPT DEPARTMENT || === */
function promptDepartment(departmentChoices) {
	inquirer
		.prompt(prompt.departmentPrompt(departmentChoices))
		.then(function (answer) {
			console.log("answer ", answer.departmentId);

			var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
			FROM employee e
			JOIN role r
				ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			WHERE d.id = ?`;

			connection.query(query, answer.departmentId, function (err, res) {
				if (err) throw err;

				console.table("response ", res);
				console.log(res.affectedRows + "Employees are viewed!\n");

				firstPrompt();
			});
		});
}

/* === || VIEW DEPARTMENTS || === */
function viewDepartments() {
	var query = "SELECT * FROM department";
	connection.query(query, function (err, res) {
		console.log(`DEPARTMENTS:`);
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
		console.log(`ROLES:\n`);
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
	// --- ↓ ⚠ Budget = total salary of each employee in department ⚠ ↓ ---
	var query = `SELECT d.name, 
		r.salary, sum(r.salary) AS budget
		FROM employee e 
		LEFT JOIN role r ON e.role_id = r.id
		LEFT JOIN department d ON r.department_id = d.id
		group by d.name`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		console.log(`DEPARTMENT BUDGETS:\n`);
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
function addEmployee() {
	console.log("Inserting an employee!");

	var query = `SELECT r.id AS value, r.title, r.salary 
      FROM role r`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		console.table(res);
		console.log("RoleToInsert!");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptInsert(res);
	});
}

/* === || PROMPT ADD EMPLOYEE || === */
function promptInsert(roleChoices) {
	inquirer.prompt(prompt.insertEmployee(roleChoices)).then(function (answer) {
		console.log(answer);

		var query = `INSERT INTO employee SET ?`;
		// insert a new item into the db
		connection.query(
			query,
			{
				first_name: answer.first_name,
				last_name: answer.last_name,
				role_id: answer.roleId,
				manager_id: answer.managerId,
			},
			function (err, res) {
				if (err) throw err;

				console.table(res);
				console.log(res.insertedRows + "Inserted successfully!\n");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			},
		);
	});
}

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
		const departmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		console.table(res);
		console.log("Department array!");

		promptAddRole(departmentChoices);
	});
}

/* === || PROMPT ADD ROLE || === */
function promptAddRole(departmentChoices) {
	inquirer.prompt(prompt.insertRole(departmentChoices)).then(function (answer) {
		var query = `INSERT INTO role SET ?`;

		connection.query(
			query,
			{
				title: answer.roleTitle,
				salary: answer.roleSalary,
				department_id: answer.departmentId,
			},
			function (err, res) {
				if (err) throw err;

				console.table(res);
				console.log("Role Inserted!");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				viewRoles();
			},
		);
	});
}

// === ╔══════════════════╗ ===
// === ║ UPDATE FUNCTIONS ║ ===
// === ╚══════════════════╝ ===

/* === || UPDATE EMPLOYEE ROLE FUNCTION || === */
function updateEmployeeRole() {
	console.log("Updating an employee's role");

	var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		// Select Employee to Update Role
		const employeeChoices = res.map(({ id, first_name, last_name }) => ({
			value: id,
			name: `${first_name} ${last_name}`,
		}));

		console.table(res);
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		roleArray(employeeChoices);
	});
}

/* === || UPDATE ROLE || === */
function roleArray(employeeChoices) {
	console.log("Updating an role");

	var query = `SELECT r.id, r.title, r.salary 
  FROM role r`;
	let roleChoices;

	connection.query(query, function (err, res) {
		if (err) throw err;

		roleChoices = res.map(({ id, title, salary }) => ({
			value: id,
			title: `${title}`,
			salary: `${salary}`,
		}));

		console.table(res);
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptEmployeeRole(employeeChoices, roleChoices);
	});
}

/* === || PROMPT ROLE || === */
function promptEmployeeRole(employeeChoices, roleChoices) {
	inquirer
		.prompt(prompt.updateRole(employeeChoices, roleChoices))
		.then(function (answer) {
			var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
			// after prompting, insert a new item into the db
			connection.query(query, [answer.roleId, answer.employeeId], function (
				err,
				res,
			) {
				if (err) throw err;

				console.table(res);
				console.log(res.affectedRows + "Updated successfully!");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || UPDATE MANAGER FUNCTION || === */
function updateEmployeeManager() {
	console.log("Updating an employee's manager\n");

	var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		// Select Employee
		const empChoices = res.map(
			({ id, first_name, last_name, title, department, manager }) => ({
				value: id,
				name: `${first_name} ${last_name}`,
				title: `${title}`,
				department: `${department}`,
				manager: `${manager}`,
			}),
		);
		console.table(res);
		console.log("managerEmpChangeArray to Update!");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		managerArray(empChoices);
	});
}

/* === || UPDATE MANAGER || === */
function managerArray(empChoices) {
	console.log("Updating employee's manager");

	var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

	let mgrChoices;

	connection.query(query, function (err, res) {
		if (err) throw err;

		// Select Manager
		mgrChoices = res.map(
			({ id, first_name, last_name, title, department }) => ({
				value: id,
				name: `${first_name} ${last_name}`,
				title: `${title}`,
				department: `${department}`,
			}),
		);

		console.table(res);
		console.log("roleArray to Update!");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptEmployeeManager(empChoices, mgrChoices);
	});
}

/* === || PROMPT UPDATE MANAGER || === */
// ---------- ↓ ⚠ Selection Not Updating ⚠ ↓ ----------
function promptEmployeeManager(empChoices, mgrChoices) {
	inquirer
		.prompt(prompt.updateManager(empChoices, mgrChoices))
		.then(function (answer) {
			// log to verify correct value replacments
			console.log(
				"\n",
				"Employee's E-ID:",
				answer.employeeID,
				"\n",
				"Manager's E-ID",
				answer.managerId,
				"\n",
			);

			// Set Employee's manager_id to seleced manager's employee (value) ID
			var query = `UPDATE employee SET manager_id = ? WHERE id = ?`;

			// after prompting, insert a new item into the db
			connection.query(query, [answer.managerId, answer.employeeId], function (
				err,
				res,
			) {
				if (err) throw err;

				console.table(res);
				// ---------- ↓ ⚠ No rows matched or changed ⚠ ↓ ----------
				// Employee's manager_id should be replaced with selected manager's employee id
				// Correct ID's are being selected, but manager id its not being replaced
				console.log(res.affectedRows + " Updated successfully!");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");
				firstPrompt();
			});
		});
}

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

		const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
			value: id,
			name: `${id} ${first_name} ${last_name}`,
		}));

		console.table(res);
		console.log("ArrayToDelete!\n");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptDeleteEmployee(deleteEmployeeChoices);
	});
}

/* === || PROMPT REMOVE EMPLOYEE || === */
function promptDeleteEmployee(deleteEmployeeChoices) {
	inquirer
		.prompt(prompt.deleteEmployeePrompt(deleteEmployeeChoices))
		.then(function (answer) {
			var query = `DELETE FROM employee WHERE ?`;
			// after prompting, insert a new item into the db
			connection.query(query, { id: answer.employeeId }, function (err, res) {
				if (err) throw err;

				console.table(res);
				console.log(res.affectedRows + "Deleted!\n");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				firstPrompt();
			});
		});
}

/* === || REMOVE DEPARTMENT || === */
function deleteDepartment() {
	console.log("Deleting a department");

	var query = `SELECT e.id, e.name FROM department e`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		const deleteDepartmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		console.table(res);
		console.log("ArrayToDelete!\n");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptDeleteDepartment(deleteDepartmentChoices);
	});
}

/* === || PROMPT REMOVE DEPARTMENT || === */
function promptDeleteDepartment(deleteDepartmentChoices) {
	inquirer
		.prompt(prompt.deleteDepartmentPrompt(deleteDepartmentChoices))
		.then(function (answer) {
			var query = `DELETE FROM department WHERE ?`;
			// after prompting, insert a new item into the db
			connection.query(query, { id: answer.departmentId }, function (err, res) {
				if (err) throw err;

				console.table(res);
				console.log(res.affectedRows + "Deleted!\n");
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

		const deleteRoleChoices = res.map(
			({ id, title, salary, department_id }) => ({
				value: id,
				name: `${id} ${title} ${salary} ${department_id}`,
			}),
		);

		console.table(res);
		console.log("ArrayToDelete!\n");
		console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

		promptDeleteRole(deleteRoleChoices);
	});
}

/* === || PROMPT REMOVE ROLE || === */
function promptDeleteRole(deleteRoleChoices) {
	inquirer
		.prompt(prompt.deleteRolePrompt(deleteRoleChoices))
		.then(function (answer) {
			var query = `DELETE FROM role WHERE ?`;
			// after prompting, insert a new item into the db
			connection.query(query, { id: answer.roleId }, function (err, res) {
				if (err) throw err;

				console.table(res);
				console.log(res.affectedRows + "Deleted!\n");
				console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

				viewRoles();
			});
		});
}
