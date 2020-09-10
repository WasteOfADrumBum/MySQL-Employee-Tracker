USE employeesDB;

/* === || DEPARTMENT ARRAY || === */
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

/* === || ROLE ARRAY || === */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
/* Sales Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
/* Sales Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
/* Engineering Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
/* Engineering Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 150000, 3);
/* Accounting Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
/* Accounting Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
/* Legal Department */


/* === || EMPLOYEE ARRAY || === */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* John Doe - Sales Lead - Sales Department */
VALUES ("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Ryan Reynolds - Sales Lead - Sales Department */
VALUES ("Ryan", "Reynolds", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Jane Doe - Salesperson - Sales Department */
VALUES ("Jane", "Doe", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Joshua Small - Lead Engineer - Engineering Department */
VALUES ("Joshua", "Small", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Maggie Small - Software Engineer - Engineering Department */
VALUES ("Maggie", "Small", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* George Clooney - Account Manager- Accounting Department */
VALUES ("George", "Clooney", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* James Brown - Accountant - Accounting Department */
VALUES ("James", "Brown", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Tom Allen - Leagl Team Lead - Legal Department */
VALUES ("Tom", "Allen", 7, null);
