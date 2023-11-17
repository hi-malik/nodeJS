const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3500

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

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))