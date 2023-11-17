const {logger, logEvents} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3500

app.use(logger)

// CORS => Cross Origin Resource Sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1', 'http://localhost:5500']
const corsOptions = {
    origin : (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){ // in deployment remove this || !origin
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions))

//built-in middleware to handle urlencoded data
// in other words form data;
app.use(express.urlencoded({extended:false}))

// built-in middleware for json
app.use(express.json())

// serve static file
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/&|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
    // res.sendFile('./views/index.html', {root : __dirname})
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
})

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("Attempt to load hello.html")
    next()
}, (req, res) => {
    res.send('Hello World')
})

// chaining route handlers
const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('Finished')
    res.send("Task Finished")
}

app.get('/chain(.html)?', [one, two, three])

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')){
        res.json({error : "404 not found"})
    }
    else{
        res.type('txt').send("404 not found")
    }
})

// This is a custom error for CORS
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))