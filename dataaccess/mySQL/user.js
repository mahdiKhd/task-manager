const {promisePool} = require('../../util/DB/mysql');


class UserDataAccess {
    static async getUserById(id){
        try {
            const query = 'SELECT * FROM users WHERE user_id = ?';
            const results = await promisePool.query(query, [id]);

            console.log(results)
            if (results.length === 0) {
                return null; // User not found
            }

            return results[0];
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

            return results[0];
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

            return results[0];
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

            return results[0];
        } catch (error) {
            throw error;
        }
    }

    static async insertNewUser(email, phoneNumber, username, password){
        const sql = "INSERT INTO users (email, phone_number, username, password, role) VALUES (?, ?, ?, ?, ?);";
        try {
            const [result] = await promisePool.execute(sql, [email, phoneNumber, username, password, 'user']);
            console.log(result);
            return { success: true, message: "User added successfully", userId: result.insertId };
        } catch (error) {
            console.error("Error adding user:", error.message);
            return { success: false, message: error.message };
        }
    }
}

module.exports = UserDataAccess;