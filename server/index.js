const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const routes = require('./routes/invoice')
const port = 9000
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/lightning', routes)

app.get('/', (request, response) => {
  response.json({ info: 'Tower directory API' })
})

app.get('/towers', db.getTowers)
app.get('/towers/:id', db.getTowerById)
app.delete('/towers/:id', db.deleteTower)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
