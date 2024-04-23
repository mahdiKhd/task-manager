const expressInitialization = require('./presentation/root');
const {testDBConnection} = require('./util/DB/mysql');

async function main() {
    await testDBConnection();
    expressInitialization();
}

main().then(function (){
    console.log("Server started successfully.");
}).catch(error => {
    console.log("Server start failed: " + error);
})