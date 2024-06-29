const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const { sequelize } = require('./models/Guest')

// middleware
app.use(express.json())

app.use('/api', routes)

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Apps successfully running in http://localhost:${port}`)
  })
}).catch(err => {
  console.error('Cannot connect to database:', err)
})