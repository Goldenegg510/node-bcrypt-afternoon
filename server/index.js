require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()

massive(CONNECTION_STRING).then((db) => {
  app.set('db', db)
  console.log('db is connected')
})

app.use(express.json())
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET
}))

app.post('/auth/register', authController.register)
app.post('/auth/login', authController.login)
app.get('/auth/logout', authController.logout)

app.listen(SERVER_PORT, () => {
  console.log('listening on port', SERVER_PORT)
})