const jwt = require('jsonwebtoken');
require('dotenv').config();

const {TOKEN_KEY} = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("ACCESS_DENIED");
    }
    try {
        req.user = jwt.verify(token, TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
module.exports = verifyToken;