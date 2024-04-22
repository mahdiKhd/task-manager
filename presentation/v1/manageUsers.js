const {UserHandler} = require('../../handler/user');
const verifyToken = require('../middleware/jwtAuthentication');


function manageUsersExpress(app){

    // get all users
    app.get("/v1/user/manageUsers/getAllUsers", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const users = await UserHandler.getAllUsers();
            res.json({
                result: "OK",
                users,
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });

    // edit all users (admins only)
    app.get("/v1/user/manageUsers/editAllUsers", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId; // todo
            const {username} = req.body;
            const users = await UserHandler.editAllUsers();
            res.json({
                result: "OK",
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });
    // delete user (admin only)
    app.get("/v1/user/manageUsers/deleteUser", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {username} = req.body;
            const users = await UserHandler.deleteUser(username);
            res.json({
                result: "OK",
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            });
        }
    });

    // assign role (admin only)
    app.post("/v1/user/manageUsers/assignRole", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {username, role} = req.body;
            await UserHandler.assignRole(userId, username, role);
            res.json({
                result: "OK",
            });
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })
}

module.exports = manageUsersExpress;