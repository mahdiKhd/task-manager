const userDataAccess = require('../dataaccess/mySQL/user');

const errorCodes = require('../config/errorCode');


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

        // check password

        // return token
    }
}

module.exports = RegisterAndLogin;