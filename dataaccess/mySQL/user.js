const {promisePool} = require('../../util/DB/mysql');
const errorCodes = require("../../config/errorCode");


class UserDataAccess {
    static async getUserById(id){
        try {
            const query = 'SELECT * FROM users WHERE user_id = ?';
            const results = await promisePool.query(query, [id]);

            if (results[0].length === 0) {
                return null; // User not found
            }

            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username){
        try {
            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await promisePool.query(query, [username]);
            if (results[0].length === 0) {
                return null; // User not found
            }

            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email){
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const results = await promisePool.query(query, [email]);
            if (results[0].length === 0) {
                return null; // User not found
            }

            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async getUserByPhoneNumber(phoneNumber){
        try {
            const query = 'SELECT * FROM users WHERE phone_number = ?';
            const results = await promisePool.query(query, [phoneNumber]);

            if (results[0].length === 0) {
                return null; // User not found
            }

            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async insertNewUser(email, phoneNumber, username, password){
        const sql = "INSERT INTO users (email, phone_number, username, password, role) VALUES (?, ?, ?, ?, ?);";
        try {
            await promisePool.execute(sql, [email, phoneNumber, username, password, 'user']);
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers(page, limit){
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        const offset = (page - 1) * limit;

        // SQL query to get users with limit and offset
        const sql = "SELECT user_id, email, phone_number, username, role FROM users ORDER BY username ASC LIMIT ? OFFSET ?;";

        try {
            // Use pool to execute the query
            const [users] = await promisePool.query(sql, [limit, offset]);
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(username){
        const sql = "DELETE FROM users WHERE username = ?;";

        try {
            const [result] = await promisePool.query(sql, [username]);

            if (result.affectedRows > 0) {
                return `User '${username}' deleted successfully`;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async assignAdmin(username){
        const sql = "UPDATE users SET role = 'admin' WHERE username = ?;";

        try {
            // Execute the query to assign the admin role to the user with the provided username
            const [result] = await promisePool.query(sql, [username]);

            // Check if any rows were affected (user found and role updated)
            if (result.affectedRows > 0) {
                return `Admin role assigned to user '${username}' successfully`;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async editProfileEmail(userId, email){
        const sql = "UPDATE users SET email = ? WHERE user_id = ?;";

        try {
            const [result] = await promisePool.query(sql, [email, userId]);

            if (result.affectedRows > 0) {
                return `email updated successfully. `;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async editProfilePhoneNumber(userId, phoneNumber){
        const sql = "UPDATE users SET phone_number = ? WHERE user_id = ?;";

        try {
            const [result] = await promisePool.query(sql, [phoneNumber, userId]);

            if (result.affectedRows > 0) {
                return `phone number updated successfully. `;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async changePassword(userId, password){
        const sql = "UPDATE users SET password = ? WHERE user_id = ?;";

        try {
            const [result] = await promisePool.query(sql, [password, userId]);

            if (result.affectedRows > 0) {
                return `password updated successfully. `;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserDataAccess;