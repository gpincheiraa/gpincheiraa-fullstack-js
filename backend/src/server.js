const app = require('./app')
const port = process.env.PORT
const environment = process.env.NODE_ENV

app.listen(port, () => {
  console.log(`App server listening in mode ${environment} on port ${port}`)
})