const mysql = require('mysql2');

const mysqlHost = process.env.MYSQL_HOST;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;

const mysqlConfig = {
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDatabase,
};

function testDBConnection() {
    const connection = mysql.createConnection(mysqlConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL server');
        connection.end(); // Close the connection after successful test
    });
}

const pool = mysql.createPool(mysqlConfig);

module.exports = {pool, testDBConnection};