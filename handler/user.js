const manageUsersDomain = require('../domain/manageUsers');
const registerAndLoginDomain = require('../domain/registerAndLogin');
const userProfileDomain = require('../domain/userProfile');

const Validation = require('../util/validation/validation');



class UserHandler {

    // register and login
    static async registerUser(email, phoneNumber, username, password) {

        Validation.emailValidation(email);
        Validation.phoneNumberValidation(phoneNumber);
        Validation.usernameValidation(username);
        Validation.passwordValidation(password);

        return await registerAndLoginDomain.registerUser(email, phoneNumber, username, password);
    }

    static async loginUser(username, password) {

        Validation.usernameValidation(username);
        Validation.passwordValidation(password);

        return await registerAndLoginDomain.loginUser(username, password);
    }

    // manage users
    static async getAllUsers(userId, page, limit) {
        return await manageUsersDomain.getAllUsers(userId, page, limit);
    }

    static async editAllUsers() {
        //todo
    }

    static async deleteUser(userId, username) {
        return await manageUsersDomain.deleteUser(userId, username);
    }

    static async assignRoleAdmin(userId, username) {
        return await manageUsersDomain.assignRoleAdmin(userId, username);
    }

    // profile

    static async editProfile(userId, param) {
        const email = param.email;
        const phoneNumber = param.phoneNumber;
        if (email) {
            Validation.emailValidation(email);
        }
        if (phoneNumber) {
            Validation.phoneNumberValidation(phoneNumber);
        }
        return await userProfileDomain.editProfile(userId, param);
    }

    static async changePassword(userId, oldPassword, newPassword) {
        Validation.passwordValidation(newPassword);

        return await userProfileDomain.changePassword(userId, oldPassword, newPassword);
    }

    static async uploadProfilePhoto() {

    }
}
module.exports = {UserHandler};