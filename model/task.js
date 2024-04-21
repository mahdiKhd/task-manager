const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    attachment: {
        type: String,
        required: false,
    },
    createdDate: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('task', taskSchema);