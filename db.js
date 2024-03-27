const fs = require('fs')

let db_path = "";
let db_path_data = ""
let db_path_meta = ""
let seq=0;

function store(socketid, file_meta, message){
    currSeq()
    let newname = renameWithSeq(file_meta)
    fs.appendFileSync(db_path_data+"/"+newname, message)
    fs.writeFileSync(db_path_meta+"/"+newname+'.meta', file_meta)
    if(message.length == 0)
    nextSeq()
}

function fillCred(){
    try {
        const data = fs.readFileSync('../paths', 'utf8');
        db_path = data.split('\n')[0]
        db_path_meta = data.split('\n')[1]
        db_path_data = data.split('\n')[2]
        return data;
    } catch (err) {
        return null;
    }
}

function renameWithSeq(fileName){
    let s = fileName.indexOf('.');
    let g;
    if(s == 0){
        g = fileName + '_s' + seq
    }else{
        g = fileName.substring(0, s) + '_s' + seq + fileName.substring(s, fileName.length)
    }
    console.log(g)
    return g; 
}

function currSeq(){
    try {
        const data = fs.readFileSync('../paths', 'utf8');
        seq = data.split('\n')[3]
    } catch (err) {
        console.log(err)
    }
}

function nextSeq(){
    try {
        seq++;
        let s = db_path + '\n' + db_path_meta + '\n' + db_path_data + '\n' + seq
        fs.writeFileSync('../paths', s);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    store,
    fillCred
}