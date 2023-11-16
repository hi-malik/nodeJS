const logEvents = require('./logEvents')
const EventEmitter = require('events')

const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

class MyEmitter extends EventEmitter { }

// initalise object
const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500

const serveFile = async (filePath, contentType, response) => {
    try{
        const rawData = await fsPromises.readFile(filePath, 'utf-8')
        const data = contentType === 'application/JSON' ? JSON.parse(rawData) : rawData
        response.writeHead(200, {'Content-Type' : contentType})
        response.end(
            contentType==='application/JSON' ? JSON.stringify(data) : data
        )
    }
    catch (err) {
        console.log(err)
        response.statusCode(500)
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break
        case 'js':
            contentType = 'text/javascript'
            break
        case 'json':
            contentType = 'application/json'
            break
        case 'jpg':
            contentType = 'image/jpg'
            break
        case 'png':
            contentType = 'image/png'
            break
        case '.txt':
            contentType = 'text/plain'
            break
        default:
            contentType = 'text/html'
            break
    }

    let filePath = contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url)


    // makes .html extension not require in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)

    if(fileExists){
        // serve the file
        serveFile(filePath, contentType, res)
    }
    else{
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'Location' : '/new-page.html'})
                res.end()
                break
            case 'www-page.html':
                res.writeHead(301, {'Location' : '/'})
                res.end()
                break
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }

})

server.listen(PORT, () => console.log(`The server is running at ${PORT}`))


// add listner for the log event
// myEmitter.on('log', (msg) => logEvents(msg))

// setTimeout(() => {
//     //Emit event
//     myEmitter.emit('log', 'Log event emitted!')
// }, 2000)

/*
let pat;
    if(req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200
        res.setHeader('Content-type', 'text/html')
        pat = path.join(__dirname, 'views', 'index.html')
        fs.readFile(path, 'utf-8', (err, data) => {
            res.end(data)
        })
    }
*/