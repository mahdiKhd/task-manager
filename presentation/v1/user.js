function userExpress(app){
    app.get("/v1", async function(req,res){
        res.json({
            message: "init test",
        });
    });
}

module.exports = userExpress;