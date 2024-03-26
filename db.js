const fs = require('fs')

let db_path = "";
let db_path_data = ""
let db_path_meta = ""

function store(file_meta, message){

}
function fillCred(){
    try {
        const data = fs.readFileSync('/home/ahmed/fun/paths', 'utf8');
        return data;
    } catch (err) {
        return null;
    }
}


module.exports = {
    store,
    fillCred
}