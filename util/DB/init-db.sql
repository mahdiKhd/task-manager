-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    role ENUM('admin', 'user'),
    signup_date DATE,
    last_modified_email DATETIME,
    last_modified_phone_number DATETIME,
    last_modified_username DATETIME,
    profile_photo BLOB
);

-- Create the 'tasks' table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    user_id INT,
    attachment BLOB,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create first admin
INSERT INTO users (email, phone_number, username, password, role)
VALUES ('khoshdellmahdi@gmail.com', '09034658827', 'admin', 'admin', 'admin');
