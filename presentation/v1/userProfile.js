const {UserHandler} = require('../../handler/user');
const verifyToken = require('../middleware/jwtAuthentication');


function userProfileExpress(app){
    // edit profile
    app.post("/v1/user/userProfile/editProfile", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {phoneNumber, email} = req.body;
            const users = await UserHandler.editProfile({phoneNumber, email});
            res.json({
                result: "OK",
            })
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })

    // change password
    app.post("/v1/user/userProfile/changePassword", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;

            const users = await UserHandler.changePassword();
            res.json({
                result: "OK",
            })
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })

    // upload profile photo
    app.post("/v1/user/userProfile/uploadProfilePhoto", verifyToken, async function (req, res) {
        try {
            const userId = req.user.userId;
            const {profilePhoto} = req.body;
            await UserHandler.uploadProfilePhoto();
            res.json({
                result: "OK",
            })
        } catch (error) {
            res.json({
                result: "ERR",
                message: error.message,
            })
        }
    })
}

module.exports = userProfileExpress;