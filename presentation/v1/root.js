manageUsersExpress = require('./manageUsers');
registerAndLoginExpress = require('./registerAndLogin');
taskExpress = require('./task');
userProfileExpress = require('./userProfile');

function initializeServerV1(app) {
    manageUsersExpress(app);
    registerAndLoginExpress(app);
    taskExpress(app);
    userProfileExpress(app);
}
module.exports = initializeServerV1;
