const {promisePool} = require("../../util/DB/mysql");
const errorCodes = require("../../config/errorCode");


class TaskDataAccess {
    static async insertNewTask(userId, name, description) {
        const sql = "INSERT INTO tasks (name, description, user_id, created_at, last_modified_at, attachment) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            await promisePool.execute(sql, [name, description, userId, new Date(), new Date(), null]);
            return 'task added successfully.';
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(taskId){
        try {
            const query = 'SELECT * FROM tasks WHERE task_id = ?';
            const results = await promisePool.query(query, [taskId]);
            if (results[0].length === 0) {
                return null;
            }
            return results[0][0];
        } catch (error) {
            throw error;
        }
    }

    static async getAllTasks(page, limit){
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        const offset = (page - 1) * limit;

        const sql = "SELECT * FROM tasks ORDER BY task_id ASC LIMIT ? OFFSET ?;"
        try {
            const [result] = await promisePool.query(sql, [limit, offset]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async editTaskName(taskId, name){
        const sql = "UPDATE tasks SET name = ?, last_modified_at = NOW() WHERE task_id = ?;";
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
        const sql = "UPDATE tasks SET description = ?, last_modified_at = NOW() WHERE task_id = ?;";
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