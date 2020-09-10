module.exports = {
	// === ╔════════════════╗ ===
	// === ║ INITIAL PROMPT ║ ===
	// === ╚════════════════╝ ===

	firstPrompt: {
		type: "list",
		name: "task",
		message: "Make a selection:",
		choices: [
			/* === || VIEW || === */
			"View Employees", // viewEmployee();
			"View Employees by Manager", // viewEmployeeByManager();
			"View Employees by Department", // viewEmployeeByDepartment();
			"View Departments", // viewDepartments();
			"View Roles", // viewRoles();
			"View Department Budget", // viewDepartmentBudget();
			/* === || ADD || === */
			"Add Employee", // addEmployee();
			"Add Department", // addDepartment();
			"Add Role", // addRole();
			/* === || UPDATE || === */
			"Update Employee Role", // updateEmployeeRole();
			"Update Employee Manager", // updateEmployeeManager();
			/* === || REMOVE || === */
			"Remove Employee", // removeEmployees();
			"Remove Department", // removeDepartment();
			"Remove Role", // removeRole();
			/* === || EXIT || === */
			"Exit",
		],
	},

	// === ╔═════════════════╗ ===
	// === ║ VIEW BY PROMPTS ║ ===
	// === ╚═════════════════╝ ===

	/* === || PROMPT EMPLOYEE BY MANAGER || === */
	viewManagerPrompt: (managerChoices) => [
		{
			type: "list",
			name: "managerId",
			message: "Which manager will you choose?",
			choices: managerChoices,
		},
	],

	/* === || PROMPT VIEW EMPLOYEE BY DEPARTMENT || === */
	departmentPrompt: (departmentChoices) => [
		{
			type: "list",
			name: "departmentId",
			message: "Which department will you choose?",
			choices: departmentChoices,
		},
	],

	// === ╔═════════════╗ ===
	// === ║ ADD PROMPTS ║ ===
	// === ╚═════════════╝ ===

	/* === || PROMPT ADD EMPLOYEE || === */
	insertEmployee: (departmentArray, roleArray, managerArray) => [
		{
			name: "firstName",
			type: "input",
			message: "Enter employee's first name:",
		},
		{
			name: "lastName",
			type: "input",
			message: "Enter employee's last name:",
		},
		{
			name: "department",
			type: "list",
			message: "Choose employee's department",
			choices: departmentArray,
		},
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: roleArray,
		},
		{
			name: "manager",
			type: "list",
			message: "Choose the manager of this employee:",
			choices: managerArray,
		},
	],

	/* === || PROMPT ADD DEPARTMENT || === */
	insertDepartment: {
		name: "department",
		type: "input",
		message: "What is the name of the new department?",
	},

	/* === || PROMPT ADD ROLE || === */
	insertRole: (departmentChoices) => [
		{
			type: "input",
			name: "roleTitle",
			message: "Role title?",
		},
		{
			type: "input",
			name: "roleSalary",
			message: "Role Salary",
		},
		{
			type: "list",
			name: "departmentId",
			message: "Department?",
			choices: departmentChoices,
		},
	],

	// === ╔════════════════╗ ===
	// === ║ UPDATE PROMPTS ║ ===
	// === ╚════════════════╝ ===

	/* === || PROMPT UPDATE ROLE || === */
	updateRole: (employees, job) => [
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose role is to be updated:",
			choices: employees,
		},
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: job,
		},
	],

	/* === || PROMPT UPDATE MANAGER || === */
	updateManager: (employees) => [
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose manager is to be updated:",
			choices: employees,
		},
		{
			name: "manager",
			type: "list",
			message: "Choose employee's new manager",
			choices: employees,
		},
	],

	// === ╔════════════════╗ ===
	// === ║ REMOVE PROMPTS ║ ===
	// === ╚════════════════╝ ===

	/* === || PROMPT REMOVE EMPLOYEE || === */
	deleteEmployeePrompt: (deleteEmployeeChoices) => [
		{
			type: "list",
			name: "employeeId",
			message: "Which employee do you want to remove?",
			choices: deleteEmployeeChoices,
		},
	],

	/* === || PROMPT REMOVE DEPARTMENT || === */
	deleteDepartmentPrompt: (deleteDepartmentChoices) => [
		{
			type: "list",
			name: "departmentId",
			message: "Which department do you want to remove?",
			choices: deleteDepartmentChoices,
		},
	],

	/* === || PROMPT REMOVE ROLE || === */
	deleteRolePrompt: (deleteRoleChoices) => [
		{
			type: "list",
			name: "roleId",
			message: "Which role do you want to remove?",
			choices: deleteRoleChoices,
		},
	],
};
