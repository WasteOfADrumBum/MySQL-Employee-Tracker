USE employeesDB;

/* === || DEPARTMENTS || === */
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

/* === || ROLES || === */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

/* === || EMPLOYEES || === */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joshua", "Small", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maggie", "Small", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Clooney", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Brown", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Reynolds", 1, 2);