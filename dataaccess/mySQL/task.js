const {promisePool} = require("../../util/DB/mysql");
const errorCodes = require("../../config/errorCode");


class TaskDataAccess {
    static async insertNewTask(userId, name, description) {
        const sql = "INSERT INTO tasks (name, description, user_id) VALUES (?, ?, ?);";
        try {
            await promisePool.execute(sql, [name, description, userId]);
            return 'task added successfully.';
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(id){
        try {
            const query = 'SELECT * FROM tasks WHERE task_id = ?';
            const results = await promisePool.query(query, [id]);

            if (results[0].length === 0) {
                return null; // User not found
            }

            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async editTaskName(taskId, name){
        const sql = "UPDATE tasks SET name = ? WHERE task_id = ?;";

        try {
            const [result] = await promisePool.query(sql, [name, taskId]);

            if (result.affectedRows > 0) {
                return `task name updated successfully. `;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async editTaskDescription(taskId, description){
        const sql = "UPDATE tasks SET description = ? WHERE task_id = ?;";

        try {
            const [result] = await promisePool.query(sql, [description, taskId]);

            if (result.affectedRows > 0) {
                return `task description updated successfully. `;
            } else {
                const error = new Error();
                error.message = errorCodes.INVALID_OPS;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteTask(taskId){
        const sql = "DELETE FROM tasks WHERE task_id = ?";
        try {
            const [result] = await promisePool.query(sql, [taskId]);

            if (result.affectedRows > 0) {
                return `task deleted successfully. `;
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

module.exports = TaskDataAccess;