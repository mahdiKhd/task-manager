const userDataAccess = require('../dataaccess/mySQL/user');
const errorCodes = require("../config/errorCode");

class ManageUsers {
    static async getAllUsers(userId, page, limit) {

        // check access
        await this.checkAdminAccessibility(userId);

        // return all users
        return await userDataAccess.getAllUsers(page, limit);
    }

    static async deleteUser(userId, username) {

        // check access
        await this.checkAdminAccessibility(userId);

        // delete user
        return await userDataAccess.deleteUser(username);
    }

    static async assignRoleAdmin(userId, username){
        // check access
        await this.checkAdminAccessibility(userId);

        // check user role
        const userByUsername = await userDataAccess.getUserByUsername(username);
        if (!userByUsername || userByUsername.role === 'admin') {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // assign role
        return await userDataAccess.assignAdmin(username);
    }

    static async checkAdminAccessibility(userId){
        // get user by id and check role
        const userById = await userDataAccess.getUserById(userId);

        if (!userById || userById.role !== 'admin') {
            const error = new Error();
            error.message = errorCodes.ACCESS_DENIED;
            throw error;
        }
    }
}

module.exports = ManageUsers;