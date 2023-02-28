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

view = (answer) => {
    db.query(`SELECT * FROM ${answer}`, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.table(data);
        }
        reRun();
    })
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
            choices: [],
            name: 'roleDepartment'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO role (name, salary, department) VALUES (?, ?, ?)`, [answer.roleName, answer.roleSalary, answer.roleDepartment]);
        reRun();
    })
}


addEmployee = () => {
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
            choices: [],
            name: 'employeeRole'
        },
        {
            message: 'Who is their Manager?',
            type: 'list',
            choices: [],
            name: 'employeeManager'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO employee (firstName, lastName, role, manager) VALUES (?, ?, ?, ?)`, [answer.firstName, answer.lastName, answer.role, answer.manager]);
        reRun();
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
                        choices: ['role', 'department', 'employee'],
                        name: 'view'
                    }
                ])
                .then((answer) => {
                    view(answer.view)
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
                //update employee
                //db.query?
                // db.query('UPDATE');
                // let table = cTable(['','',...]);
                // console.log(table);
                // reRun();
        }
    })
}


reRun();

// db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, etc])