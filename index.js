const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'qGS<Z!Tci]14-)e}',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);


viewDepartment = () => {
    db.query('SELECT * FROM department', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.table(data);
        }
        reRun();
    });
}


viewRole = () => {
    db.query('SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.table(data);
        }
        reRun();
    });
}


viewEmployee = () => {
    // db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM ((employee INNER JOIN role ON employee.role_id = role.title, employee.role_id = role.salary) INNER JOIN department ON employee.role_id = role.department_id = department.name)', (err, data) => {
    //     if (err) {
    //         console.error(err)
    //     } else {
    //         console.table(data)
    //     }
        reRun();
    // });
}


addDepartment = () => {
    inquirer.prompt([
        {
            message: 'What would you like to name this department?',
            type: 'input',
            name: 'departmentName'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, [answer.departmentName]);
        reRun();
    })
}


addRole = () => {
    inquirer.prompt([
        {
            message: 'What would you like to name this role?',
            type: 'input',
            name: 'roleName'
        },
        {
            message: 'What would you like to give for the salary of that role?',
            type: 'input',
            name: 'roleSalary'
        },
        {
            message: 'What department will this role be in?',
            type: 'list',
            choices: ['1', '2', '3'],
            name: 'roleDepartment'
        }
    ])
    .then((answer) => {
        console.log(answer.roleDepartment)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.roleName, answer.roleSalary, answer.roleDepartment]);
        reRun();
    })
    .catch((err) => {
        console.error(err);
    })
}

// findRoles = () => {
//     // Find all role and return it as a arr to be used inside addEmployee.employeeRole.
//     // db.query(`SELECT * FROM role`, (err, data) => {
//     //     if (err) {
//     //         console.error(err)
//     //     } else {
//     //         let possibleRoles;
//     //         for(let i = 0; i < data.length; i++) {
//     //             possibleRoles.push(data[i].title)
//     //         }
//     //         return possibleRoles;
//     //     }
//     // })
// }

addEmployee = () => {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let possibleRoles;
            for(let i = 0; i < data.length; i++) {
                possibleRoles.push(data[i].title)
            }
        }
    })
    inquirer.prompt([
        {
            message: 'What is their first name?',
            type: 'input',
            name: 'employeeFirst'
        },
        {
            message: 'What is their last name?',
            type: 'input',
            name: 'employeeLast'
        },
        {
            message: 'What is their role?',
            type: 'list',
            choices: possibleRoles,
            name: 'employeeRole'
        },
        {
            message: 'Who is their Manager?',
            type: 'list',
            choices: ['Chief Legal Officer', 'Chief Revenue Officer', 'Chief Marketing Officer', 'Chief Technology Officer'],
            name: 'employeeManager'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.firstName, answer.lastName, answer.role, answer.manager]);
        reRun();
    })
}


updateDB = () => {
    inquirer.prompt([
        {
            message: 'Which employee would you like to update?',
            type: 'list',
            choices: [],
            name: 'updatedEmployee'
        },
        {
            message: 'What role will the employee be?',
            type: 'list',
            choices: [],
            name: 'updatedRole'
        }
    ])
    .then((answer) => {
        db.query(`UPDATE employee SET role_id = ${answer.updatedRole} WHERE id = ${answer.updatedEmployee}`);
    })
}


reRun = () => {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ['View','Add','Update'],
            name: "toDo"
        }
    ])
    .then((response) => {
        switch(response.toDo) {
            case 'View':
                inquirer.prompt([
                    {
                        message: 'What would you like to view?',
                        type: 'list',
                        choices: ['Role', 'Department', 'Employee'],
                        name: 'view'
                    }
                ])
                .then((answer) => {
                    switch(answer.view) {
                        case 'Department':
                            viewDepartment();
                        break;
                        case 'Role':
                            viewRole();
                        break;
                        case 'Employee':
                            viewEmployee();
                        break;
                    }
                    })
            break;
            case 'Add':
                inquirer.prompt([
                    {
                        message: 'What would you like to add?',
                        type: 'list',
                        choices: ['Department', 'Role', 'Employee'],
                        name: 'add'
                    }
                ])
                .then((answer) => {
                    switch(answer.add) {
                        case 'Department':
                            addDepartment();
                        break;
                        case 'Role':
                            addRole();
                        break;
                        case 'Employee':
                            addEmployee();
                        break;
                    }
                })
            break;
            default:
                updateDB();
        }
    })
}


reRun();