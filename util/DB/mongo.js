const mongoose = require('mongoose');
const mongoDbUsername = process.env.MONGO_DB_USERNAME;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;
const mongoDbServer = process.env.MONGO_DB_SERVER;
async function initializeMongo() {
    await mongoose.connect(`mongodb://${mongoDbServer}/task-manager`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongoDbUsername,
        pass: mongoDbPassword,
    });
}
module.exports = {initializeMongo};