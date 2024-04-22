const taskDomain = require('../domain/taskDomain');
const Validation = require('../util/validation/validation');


class TaskHandler {

    static async addTask(userId, name, description) {
        Validation.taskNameValidation(name);

        return await taskDomain.addTask(userId, name, description);
    }

    static async editTask(userId, taskId, name, description) {
        Validation.taskNameValidation(name);

        return await taskDomain.editTask(userId, taskId, name, description);
    }

    static async deleteTask(userId, taskId) {
        return await taskDomain.deleteTask(userId, taskId);
    }

    static async getTask(userId, taskId, name, description) {

    }

    static async getAllTask(userId) {

    }
}
module.exports = {TaskHandler};