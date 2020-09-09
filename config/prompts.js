module.exports = {
	/* === || INITIAL PROMPT || === */
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
			// ---------- ↓ ⚠ Needs Budget Calculation ⚠ ↓ ----------
			"View Department Budget", // viewDepartmentBudget();

			/* === || ADD || === */
			"Add Employee", // addEmployee();
			"Add Department", // addDepartment();
			"Add Role", // addRole();

			/* === || UPDATE || === */
			"Update Employee Role", // updateEmployeeRole();
			// --- ↓ ⚠ Selection Not Updating ⚠ ↓ ---
			"Update Employee Manager", // updateEmployeeManager();

			/* === || REMOVE || === */
			"Remove Employee", // removeEmployees();
			"Remove Department", // removeDepartment();
			"Remove Role", // removeRole();

			/* === || EXIT || === */
			"Exit",
		],
	},

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

	/* === || PROMPT INSERT || === */
	insertEmployee: (roleChoices) => [
		{
			type: "input",
			name: "first_name",
			message: "What is the employee's first name?",
		},
		{
			type: "input",
			name: "last_name",
			message: "What is the employee's last name?",
		},
		{
			type: "list",
			name: "roleId",
			message: "What is the employee's role?",
			choices: roleChoices,
		},
	],

	/* === || PROMPT ROLE || === */
	updateRole: (employeeChoices, roleChoices) => [
		{
			type: "list",
			name: "employeeId",
			message: "Which employee do you want to set with the role?",
			choices: employeeChoices,
		},
		{
			type: "list",
			name: "roleId",
			message: "Which role do you want to update?",
			choices: roleChoices,
		},
	],

	/* === || PROMPT MANAGER || === */
	updateManager: (empChoices, mgrChoices) => [
		{
			type: "list",
			name: "employeeID",
			message: "Which employee do you want to assign a new manager?",
			choices: empChoices,
		},
		{
			type: "list",
			name: "roleId",
			message: "Which manager is to be assigned to the employee?",
			choices: mgrChoices,
		},
	],

	/* === || ADD DEPARTMENT || === */
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

	/* === || PROMPT REMOVE EMPLOYEE || === */
	deleteEmployeePrompt: (deleteEmployeeChoices) => [
		{
			type: "list",
			name: "employeeId",
			message: "Which employee do you want to remove?",
			choices: deleteEmployeeChoices,
		},
	],

	/* === || PROMPT REMOVE Department || === */
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
