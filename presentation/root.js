const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const V1 = require('./v1/root');

function initializeServer(){
    V1(app);
    app.listen(port);
}

module.exports = initializeServer;