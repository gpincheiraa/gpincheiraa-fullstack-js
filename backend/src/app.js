const express = require('express')
const authMiddleware = require('./middleware/auth')
const routes = require('./routes')

const app = express()

app.use('/api', authMiddleware)
app.use('/api', routes)

module.exports = app