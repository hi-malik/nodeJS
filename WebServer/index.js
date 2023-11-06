const http = require("http") // http is a core module
const fs = require("fs") // fs is a file system module

const server = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} : New Req Rec\n`
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url) {
            case "/":
                res.end("Welcome to the home page!")
                break
            case "/about":
                res.end("Welcome to the about page!")
                break
            default:
                res.end("404 Error: Page not found")
        }
    })
})

server.listen(8000, () => console.log("Server is running..."))