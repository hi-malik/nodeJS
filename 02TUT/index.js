// const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8')
        console.log(data)
        await fsPromises.writeFile(path.join(__dirname, 'files', 'type.txt'), 'Hi this is a message')
        await fsPromises.appendFile(path.join(__dirname, 'files', 'type.txt'), '\n\nNew message added')
        await fsPromises.rename(path.join(__dirname, 'files', 'type.txt'), path.join(__dirname, 'files', 'typeRename.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'typeRename.txt'), 'utf-8')
        console.log(newData)
        await fsPromises.unlink(path.join(__dirname, 'files', 'write.txt'))
        
    }
    catch (err){
        console.log(err)
    }
}
fileOps()

/*
fs.readFile(path.join(__dirname, 'files', 'starterCopy.txt'), 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data)
})

fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data.toString())
    console.log(data)
})

fs.writeFile(path.join(__dirname, 'files', 'write.txt'), "Nice to meet you", (err) => {
    if (err) throw err;
    console.log('The written is accomplished')

    fs.appendFile(path.join(__dirname, 'files', 'write.txt'), '\n\nI added later', (err) => {
        if (err) throw err
        console.log("Append accomplished")

        fs.rename(path.join(__dirname, 'files', 'starterCopy.txt'), path.join(__dirname, 'files', 'rename.txt'), (err) => {
            if (err) throw err
            console.log("rename accomplished")
        })
    })
})
*/
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error : ${err}`)
    process.exit(1)
})