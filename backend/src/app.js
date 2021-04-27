const express = require('express')
const authMiddleware = require('./middleware/auth')
const routes = require('./routes')
const staticFolder = `${__dirname}/public`
const app = express()

app.use(express.static(staticFolder))
app.use('/api', authMiddleware)
app.use('/api', routes)

app.get('*', (request, response) => {
  return response.sendFile(`${staticFolder}/index.html`)
})

module.exports = app