userExpress = require('./user');
function initializeServerV1(app) {
    userExpress(app);
}
module.exports = initializeServerV1;
