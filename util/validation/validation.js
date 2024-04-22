
const errorCodes = require('../../config/errorCode');


class Validation {
    static emailValidation (email) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailFormat)) {
            const error = new Error();
            error.message = errorCodes.INVALID_EMAIL;
            throw error;
        }
    }

    static phoneNumberValidation (phoneNumber) {
        const phoneRegex = /^09\d{9}$/;
        if (!phoneNumber.match(phoneRegex)) {
            const error = new Error();
            error.message = errorCodes.INVALID_PHONE_NUMBER;
            throw error;
        }
    }

    static usernameValidation (username) {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (!username.match(usernameRegex)) {
            const error = new Error();
            error.message = errorCodes.INVALID_USERNAME;
            throw error;
        }
    }

    static passwordValidation(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!password.match(passwordRegex)) {
            const error = new Error();
            error.message = errorCodes.INVALID_PASSWORD;
            throw error;
        }
    }



}

module.exports = Validation;