

class RegisterAndLogin {
    static async registerUser(email, phoneNumber, username, password) {

        // check if user with this email, phoneNumber or username doesn't exist

        // insert new user into data base

    }

    static async loginUser(username, password) {
        // check is there any user with thus username

        // check password

        // return token
    }
}

module.exports = RegisterAndLogin;