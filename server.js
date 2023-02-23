const mysql = require('mysql2');
const cTable = require('console.table');
const { default: inquirer } = require('inquirer');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'qGS<Z!Tci]14-)e}',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

reRun => {
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
                    // db.query(`SHOW TABLES ${answer.view}`);
                    // let table = cTable(['','',...]);
                    // console.log(table);
                    reRun();
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
                            inquirer.prompt([
                                {
                                    message: 'What would you like to name this department?',
                                    type: 'input',
                                    name: 'departmentName'
                                }
                            ])
                            .then((department) => {
                                // db.query(``);
                                // let table = cTable(['','',...]);
                                // console.log(table);
                                reRun();
                            })
                        break;
                        case 'Role':
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
                            .then((role) => {
                                // db.query();
                                // let table = cTable(['','',...]);
                                // console.log(table);
                                reRun();
                            })
                        break;
                        case 'Employee':
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
                            .then((employee) => {
                                // db.query();
                                // let table = cTable(['','',...]);
                                // console.log(table);
                                reRun();
                            })
                        break;
                    }
                    // reRun();
                })
            break;
            case 'Update':
                //update employee
                //db.query?
                // db.query('UPDATE');
                // let table = cTable(['','',...]);
                // console.log(table);
                reRun();
        }
    })
    
}




// db.query('SELECT * FROM employees', function (err, results) {
//     cTable(results);
// });

// db.query(`ALERT TABLE employee ${role}`)