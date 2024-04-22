const {UserHandler} = require('../../handler/user');
const verifyToken = require('../middleware/jwtAuthentication');


function registerAndLoginExpress(app){

    // sign up
    app.post("/v1/user/registerAndLogin/register", async function(req,res){
        try{
            const {email, phoneNumber, username, password} = req.body;
            await UserHandler.registerUser(email, phoneNumber, username, password);
            res.json({
                result: "OK",
            })
        } catch (error){
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })

    // sign in
    app.post("/v1/user/registerAndLogin/login", async function(req,res){
        try{
            const {username, password} = req.body;
            const {accessToken, refreshToken} = await UserHandler.loginUser(username, password);
            res.json({
                result: "OK",
                accessToken,
                refreshToken,
            })
        } catch (error){
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })
}

module.exports = registerAndLoginExpress;