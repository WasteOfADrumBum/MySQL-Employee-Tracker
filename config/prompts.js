module.exports = {
	firstPrompt: {
		type: "list",
		name: "task",
		message: "Would you like to do?",
		choices: [
			"View Employees",
			"View Employees by Department",
			"Add Employee",
			"Remove Employees",
			"Update Employee Role",
			"Add Role",
			"End",
		],
	},
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
};
