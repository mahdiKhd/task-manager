const userDataAccess = require('../dataaccess/mySQL/user');

const errorCodes = require('../config/errorCode');
const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = process.env;


class RegisterAndLogin {
    static async registerUser(email, phoneNumber, username, password) {

        // check if user with this email, phoneNumber or username doesn't exist
        const userByEmailPromise = userDataAccess.getUserByEmail(email);
        const userByPhoneNumberPromise = userDataAccess.getUserByPhoneNumber(phoneNumber);
        const userByUsernamePromise = userDataAccess.getUserByUsername(username);

        const [userByEmail, userByPhoneNumber, userByUsername] = await Promise.all([
            userByEmailPromise,
            userByPhoneNumberPromise,
            userByUsernamePromise
        ]);

        if (userByEmail || userByPhoneNumber || userByUsername) {
            const error = new Error();
            error.message = errorCodes.USER_EXISTS;
            throw error;
        }
        // insert new user into data base
        await userDataAccess.insertNewUser(email, phoneNumber, username, password);
        return 'user created successfully';
    }

    static async loginUser(username, password) {
        // check is there any user with thus username
        const userByUsername = await userDataAccess.getUserByUsername(username);

        if (!userByUsername) {
            const error = new Error();
            error.message = errorCodes.INVALID_LOGIN;
            throw error;
        }

        // check password
        if (userByUsername.password !== password) {
            const error = new Error();
            error.message = errorCodes.INVALID_LOGIN;
            throw error;
        }

        // return token
        const {refreshToken, accessToken} = this.createUserAuthenticationToken(userByUsername);
        return {refreshToken, accessToken};
    }

    static createUserAuthenticationToken(user) {
        const accessToken = jwt.sign(
            {userId: user.user_id},
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        const refreshToken = jwt.sign(
            {userId: user.user_id},
            TOKEN_KEY,
            {
                expiresIn: "365d",
            }
        );
        return {refreshToken, accessToken};
    }
}

module.exports = RegisterAndLogin;