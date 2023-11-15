const fs = require('fs')
const path = require('path')
const rs = fs.createReadStream(path.join(__dirname, 'files', 'mine.txt'), {encoding:'utf-8'})

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'copyOFmine2.txt'))

// rs.on('data', dataInside => {
//     ws.write(dataInside)
// })

rs.pipe(ws)