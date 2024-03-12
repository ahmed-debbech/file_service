const ws = require('ws');


function mountPoint(request, socket, head){

    if(request.url.startsWith('/ws')){
        console.log("mounted")
        const wsServer = new ws.Server({ noServer: true });
        wsServer.on('connection', socket => {
            socket.on('message', message => {
                console.log(message.toString())
            });
        });
    } 
}
module.exports = {mountPoint}