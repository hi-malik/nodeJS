const http = require("http");
const fs = require("fs");
const { log } = require("console");

const myServer = http.createServer((req, res) => {
    if(req.url==="/favicon.ico") return res.end()
    const log = `${Date.now()} ${req.url} : New Request Recieved\n`;
    fs.appendFile("log.txt", log, (err, result) => {
        switch(req.url){
            case "/": 
                res.end("Welcome to Home Page");
                break
            case "/about": 
                res.end("hi-malik");
                break
            default:
                res.end("404 Page Not Found");
        }
    })
    
})

myServer.listen(8000, () => console.log("Server has been started"))