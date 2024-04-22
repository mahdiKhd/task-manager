const userDataAccess = require("../dataaccess/mySQL/user");
const taskDataAccess = require("../dataaccess/mySQL/task");
const errorCodes = require("../config/errorCode");



class Task {
    static async addTask(userId, name, description) {
        // check user
        const userById = await userDataAccess.getUserById(userId);
        if (!userById) {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // add task
        return await taskDataAccess.insertNewTask(userId, name, description);
    }

    static async editTask(userId, taskId, name, description) {
        // check user
        const userById = await userDataAccess.getUserById(userId);
        if (!userById) {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // check task
        const taskById = await taskDataAccess.getTaskById(taskId);
        if (!taskById) {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // check access
        if (userById.role !== 'admin' && taskById.user_id !== userId) {
            const error = new Error();
            error.message = errorCodes.ACCESS_DENIED;
            throw error;
        }

        // edit task
        let message = ''
        if (name){
            message += await taskDataAccess.editTaskName(taskId, name);
        }
        if (description){
            message += await taskDataAccess.editTaskDescription(userId, description);
        }
        return message;
    }


}

module.exports = Task;