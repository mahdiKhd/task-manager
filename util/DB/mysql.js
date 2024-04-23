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
    waitForConnections: true,
};

async function testDBConnection() {
    const connection = mysql.createConnection(mysqlConfig);

    await connection.connect(async (err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL server');

        // check if tables exist
        connection.query(`SHOW TABLES LIKE 'users'`, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                connection.query(`
        CREATE TABLE users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE,
          email VARCHAR(255) UNIQUE,
          phone_number VARCHAR(20) UNIQUE,
          role ENUM('admin', 'user'),
          signup_date DATE,
          last_modified_email DATETIME,
          last_modified_phone_number DATETIME,
          last_modified_username DATETIME,
          profile_photo BLOB
        )`, (err) => {
                    if (err) throw err;
                    console.log("Users table created");
                    // create first admin
                    // Create initial admin user
                    const initialAdmin = {
                        username: 'admin',
                        email: 'admin@example.com',
                        phone_number: '1234567890',
                        role: 'admin',
                        signup_date: new Date(),
                        last_modified_email: new Date(),
                        last_modified_phone_number: new Date(),
                        last_modified_username: new Date()
                    };

                    connection.query(`INSERT INTO users SET ?`, initialAdmin, (err, result) => {
                        if (err) throw err;
                        console.log("Initial admin user created");
                    });
                });
            }
        });

        connection.query(`SHOW TABLES LIKE 'tasks'`, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                // Create 'tasks' table if it doesn't exist
                connection.query(`
        CREATE TABLE tasks (
          task_id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255),
          description TEXT,
          user_id INT,
          attachment BLOB,
          FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`, (err) => {
                    if (err) throw err;
                    console.log("Tasks table created");
                });
            }
        });
    });
}

const pool = mysql.createPool(mysqlConfig);
const promisePool = pool.promise();

module.exports = {promisePool, testDBConnection};