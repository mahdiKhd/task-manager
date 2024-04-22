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

    static removeUndefinedFields(obj) {
        // Filter out key-value pairs where the value is not undefined
        const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== undefined);

        // Convert the filtered entries back to an object
        return Object.fromEntries(filteredEntries);
    }
}

module.exports = UserProfile;