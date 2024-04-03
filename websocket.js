const ws = require('ws');
const db = require('./db');

let sockets = new Map()

function implementation(socket_key, message){
    if(!sockets.has(socket_key)) return;

    let msg = JSON.parse(message)

    console.log(msg)
    if(msg.type == "FIN") {
        let so = sockets.get(socket_key)
        so.close()
        sockets.delete(socket_key)
        console.log("socket " + socket_key + "has been closed")
        return;
    }

    db.store(socket_key, msg);    
}



function mountPoint(request, socket, head){
    
    let path = request.url.startsWith('/ws')
    path = request.url.includes("?id")

    if(path){
        let key = request.url.split("?")[1].split("=")[1]
        console.log("initiating socket for id: " + key)
        const wsServer = new ws.Server({ noServer: true });
        wsServer.on('connection', socket => {
            socket.on('message', message => {
                let msg = message.toString()
                implementation(key, msg)
            });
        });
        wsServer.handleUpgrade(request, socket, head, function done(ws) {
            wsServer.emit('connection', ws, request);
        });
        let obj = {websocket : wsServer}
        sockets.set(key, obj)
        console.log("socket "+key+" mounted!")
    }else{
        console.log("unable to initiate socket")
    }
}
module.exports = {mountPoint}