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
    static async getAllUsers() {
    }

    static async editAllUsers() {

    }

    static async deleteUser() {

    }

    static async assignRole(userId, userId2, role) {

    }

    // profile

    static async editProfile(param) {

    }

    static async changePassword() {

    }

    static async uploadProfilePhoto() {

    }
}
module.exports = {UserHandler};