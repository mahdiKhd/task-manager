const userDataAccess = require("../dataaccess/mySQL/user");
const errorCodes = require("../config/errorCode");
const e = require("express");


class UserProfile {
    static async editProfile(userId, param) {
        // check user
        const userById = await userDataAccess.getUserById(userId);
        if (!userById) {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // edit profile
        let message = ''
        if (param.email){
            const userByEmail = await userDataAccess.getUserByEmail(param.email);
            if (userByEmail){
                const error = new Error();
                error.message = errorCodes.USER_EXISTS;
                throw error;
            }
            message += await userDataAccess.editProfileEmail(userId, param.email);
        }
        if (param.phoneNumber){
            const userByPhone = await userDataAccess.getUserByPhoneNumber(param.phoneNumber);
            if (userByPhone){
                const error = new Error();
                error.message = errorCodes.USER_EXISTS;
                throw error;
            }
            message += await userDataAccess.editProfilePhoneNumber(userId, param.phoneNumber);
        }
        return message;
    }

    static async changePassword(userId, oldPassword, newPassword) {
        // check user
        const userById = await userDataAccess.getUserById(userId);
        if (!userById) {
            const error = new Error();
            error.message = errorCodes.INVALID_OPS;
            throw error;
        }

        // check old password
        if (userById.password !== oldPassword) {
            const error = new Error();
            error.message = errorCodes.INVALID_PASSWORD;
            throw error;
        }

        // change password
        return await userDataAccess.changePassword(userId, newPassword);
    }

}

module.exports = UserProfile;