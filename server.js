const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

// Body Parser
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
const db = process.env.MONGO_URI
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Routes
app.use('/api/admin', require('./routes/admin'))

if (process.env.NODE_ENV == 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Handle React routing, return all requests to React App
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
const serveHost = process.env.YOUR_HOST || '0.0.0.0'

app.listen(port, serveHost, () => {
    console.log(`Server running on ${port}`)
})

