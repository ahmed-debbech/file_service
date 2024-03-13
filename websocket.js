const ws = require('ws');
const fs = require('fs')

let sockets = new Map()

function implementation(key, message){
    if(!sockets.has(key)) return;

    let msg = JSON.parse(message)

    if(msg.chunk.length == 0) {
        let so = sockets.get(key)
        so.close()
        sockets.delete(key)
        console.log("socket " + key + "has been closed")
        return;
    }

    let uin = new Uint8Array(msg.chunk)

    fs.appendFileSync("downs/"+msg.fileName, uin)
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
        sockets.set(key, wsServer)
        console.log("socket "+key+" mounted!")
    }else{
        console.log("unable to initiate socket")
    }
}
module.exports = {mountPoint}