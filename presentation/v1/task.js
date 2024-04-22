const {TaskHandler} = require('../../handler/task');
const verifyToken = require('../middleware/jwtAuthentication');


function taskExpress(app){
    // add task
    app.post("/v1/task/addTask", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {name, description} = req.body;
            const message = await TaskHandler.addTask(userId, name, description);
            res.json({
                result: "OK",
                message,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });
    // edit task
    app.post("/v1/task/editTask/:taskId", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {taskId} = req.params;
            const {name, description} = req.body;
            const message = await TaskHandler.editTask(userId, taskId, name, description);
            res.json({
                result: "OK",
                message,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });

    // delete task
    app.delete("/v1/task/deleteTask/:taskId", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {taskId} = req.params;
            const message = await TaskHandler.deleteTask(userId, taskId);
            res.json({
                result: "OK",
                message,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });
    // get task
    app.get("/v1/task/:taskId", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const taskId = req.params;
            const task = await TaskHandler.getTask(userId, taskId);
            // todo DTO
            res.json({
                result: "OK",
                task,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });

    // get all tasks
    app.get("/v1/task/allTasks", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const tasks = await TaskHandler.getAllTask(userId);
            res.json({
                result: "OK",
                tasks,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });

    // upload attachment

    // download attachment
}

module.exports = taskExpress;