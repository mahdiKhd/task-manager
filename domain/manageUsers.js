const userDataAccess = require('../dataaccess/mySQL/user');
const errorCodes = require("../config/errorCode");

class ManageUsers {
    static async getAllUsers(userId, page, limit) {

        // get user by id and check role
        const userById = await userDataAccess.getUserById(userId);

        if (!userById || userById.role !== 'admin') {
            const error = new Error();
            error.message = errorCodes.ACCESS_DENIED;
            throw error;
        }

        // return all users
        return await userDataAccess.getAllUsers(page, limit);

    }
}

module.exports = ManageUsers;