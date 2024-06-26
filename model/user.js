const mongoose = require('mongoose');

const passwordValidator = function(value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(value);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: passwordValidator,
            message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.',
        }
    },
    signupDate: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('user', userSchema);