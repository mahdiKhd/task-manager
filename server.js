const expressInitialization = require('./presentation/root');
const {initializeMongo} = require('./util/DB/mongo');

async function main() {
    await initializeMongo();
    expressInitialization();
}

main().then(function (){
    console.log("Server started successfully.");
}).catch(error => {
    console.log("Server start failed: " + error);
})