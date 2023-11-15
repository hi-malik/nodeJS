const fs = require('fs')

if(!fs.existsSync('./newFolder')) {
    fs.mkdir('./newFolder', (err) => {
        if (err) throw err;
        console.log("New Directory created")
    })
}

if(fs.existsSync('./newFolder')){
    fs.rmdir('./newFolder', (err) => {
        if(err) throw err;
        console.log("Directory deleted")
    })
}