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


inquirer.prompt([
    {
        message: "What would you like to do?",
        type: "list",
        choices: ['View','Add'],
        name: "toDo"
    }
])
.then(data)




// db.query('SELECT * FROM employees', function (err, results) {
//     cTable(results);
// });

// db.query(`ALERT TABLE employee ${role}`)