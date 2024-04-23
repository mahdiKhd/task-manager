const {UserHandler} = require('../../handler/user');
const verifyToken = require('../middleware/jwtAuthentication');
const {userToDto, usersToDto} = require('./DTO/user');

function manageUsersExpress(app){

    // get all users
    app.get("/v1/user/manageUsers/getAllUsers/:page/:limit", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {page, limit} = req.params;
            const users = await UserHandler.getAllUsers(userId, page, limit);
            const presentUsers = usersToDto(users);
            res.json({
                result: "OK",
                users: presentUsers,
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
    app.delete("/v1/user/manageUsers/deleteUser", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {username} = req.body;
            const message = await UserHandler.deleteUser(userId, username);
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

    // assign role (admin only)
    app.post("/v1/user/manageUsers/assignRoleAdmin", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {username} = req.body;
            const message = await UserHandler.assignRoleAdmin(userId, username);
            res.json({
                result: "OK",
                message,
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