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
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.table(data)
        }
        reRun();
    });
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
    let possibleDepartment = [];
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            for(let i = 0; i < data.length; i++) {
                possibleDepartment.push(`${data[i].id}. ${data[i].name}`)
            }
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
            choices() {
                return possibleDepartment;
            },
            name: 'roleDepartment'
        }
    ])
    .then((answer) => {
        console.log(answer.roleDepartment)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.roleName, answer.roleSalary, answer.roleDepartment.split('.')[0]]);
        reRun();
    })
    .catch((err) => {
        console.error(err);
    })
}})
}


addEmployee = () => {
    let possibleRoles = [];
    let possibleManagers = [];
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            for(let i = 0; i < data.length; i++) {
                possibleRoles.push(`${data[i].id}. ${data[i].title}`)
            }
            db.query(`SELECT * FROM employee`, (err, data) => {
                if (err) {
                    console.error(err)
                } else {
                    for(let i = 0; i < data.length; i++) {
                        possibleManagers.push(`${data[i].id}. ${data[i].first_name} ${data[i].last_name}`)
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
            choices() {
                return possibleRoles;
            },
            name: 'employeeRole'
        },
        {
            message: 'Who is their Manager?',
            type: 'list',
            choices() {
                return possibleManagers;
            },
            name: 'employeeManager'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.employeeFirst, answer.employeeLast, answer.employeeRole.split('.')[0], answer.employeeManager.split('.')[0]]);
        reRun();
    })
}
})
}


updateEmployee = () => {
    let possibleRoles = [];
    let possibleEmployee = [];
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            for(let i = 0; i < data.length; i++) {
                possibleRoles.push(`${data[i].id}. ${data[i].title}`)
            }

            db.query(`SELECT * FROM employee`, (err, data) => {
                if (err) {
                    console.error(err)
                } else {
                    for(let i = 0; i < data.length; i++) {
                        possibleEmployee.push(`${data[i].id}. ${data[i].first_name} ${data[i].last_name}`)
                    }
                }
            console.log(possibleEmployee);
    inquirer.prompt([
        {
            message: 'Which employee would you like to update?',
            type: 'list',
            choices() {
                return possibleEmployee;
            },
            name: 'updatedEmployee'
        },
        {
            message: 'What role will the employee be?',
            type: 'list',
            choices() {
                return possibleRoles;
            },
            name: 'updatedRole'
        }
    ])
    .then((answer) => {
        db.query(`UPDATE employee SET role_id = ${answer.updatedRole.split('.')[0]} WHERE id = ${answer.updatedEmployee.split('.')[0]}`);
        reRun();
    })
})
}})
}

updateManagers = () => {
    let possibleManagers = [];
    db.query(`SELECT * FROM employee`, (err,data) => {
        if (err) {
            console.error(err);
        } else {
            for(let i = 0; i < data.length; i++) {
                possibleManagers.push(`${data[i].id}. ${data[i].first_name} ${data[i].last_name}`)
            }
        }
})
}


reRun = () => {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ['View','Add','Update','Exit'],
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
            case 'Update':
                inquirer.prompt([
                    {
                        message: 'What would you like to update?',
                        type: 'list',
                        choices: ['Employee', 'Manager'],
                        name: 'update'
                    }
                ])
                .then((answer) => {
                    switch(answer.update) {
                        case 'Employee':
                            updateEmployee();
                        break;
                        case 'Manager':
                            updateManagers();
                        break;
                    }
                })
                updateDB();
                break;
            default:
                console.log('Thank You for using.')
                process.exit();
        }
    })
}


reRun();