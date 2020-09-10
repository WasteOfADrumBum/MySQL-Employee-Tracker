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
		// Select Manager
		{
			type: "list",
			name: "managerId",
			message: "Which manager will you choose?",
			choices: managerChoices,
		},
	],

	/* === || PROMPT VIEW EMPLOYEE BY DEPARTMENT || === */
	departmentPrompt: (departmentChoices) => [
		// Select Department
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
		// Create Employee's First Name
		{
			name: "firstName",
			type: "input",
			message: "Enter employee's first name:",
		},
		// Create Employee's Last Name
		{
			name: "lastName",
			type: "input",
			message: "Enter employee's last name:",
		},
		// Select Employee's Department
		{
			name: "department",
			type: "list",
			message: "Choose employee's department",
			choices: departmentArray,
		},
		// Select Employee's Role
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: roleArray,
		},
		// Select Employee's Manager
		{
			name: "manager",
			type: "list",
			message: "Choose the manager of this employee:",
			choices: managerArray,
		},
	],

	/* === || PROMPT ADD DEPARTMENT || === */
	insertDepartment: {
		// Create New Departments Name
		name: "department",
		type: "input",
		message: "What is the name of the new department?",
	},

	/* === || PROMPT ADD ROLE || === */
	insertRole: (departmentChoices) => [
		// Create New Role's Name
		{
			type: "input",
			name: "roleTitle",
			message: "Role title?",
		},
		// Create New Role's Salary Budget
		{
			type: "input",
			name: "roleSalary",
			message: "Role Salary",
		},
		// Select New Role's Department
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
		// Select Employee to Update
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose role is to be updated:",
			choices: employees,
		},
		// Select Employee's New Role
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: job,
		},
	],

	/* === || PROMPT UPDATE MANAGER || === */
	updateManager: (employees) => [
		// Select Employee to Update
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose manager is to be updated:",
			choices: employees,
		},
		// Select Employee's New Manager
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
		// Select Employee to Remove
		{
			type: "list",
			name: "employeeId",
			message: "Which employee do you want to remove?",
			choices: deleteEmployeeChoices,
		},
	],

	/* === || PROMPT REMOVE DEPARTMENT || === */
	deleteDepartmentPrompt: (deleteDepartmentChoices) => [
		// Select Department to Remove
		{
			type: "list",
			name: "departmentId",
			message: "Which department do you want to remove?",
			choices: deleteDepartmentChoices,
		},
	],

	/* === || PROMPT REMOVE ROLE || === */
	deleteRolePrompt: (deleteRoleChoices) => [
		// Select Role to Remove
		{
			type: "list",
			name: "roleId",
			message: "Which role do you want to remove?",
			choices: deleteRoleChoices,
		},
	],
};
