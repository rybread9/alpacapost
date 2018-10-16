// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const User = require('./models/users.js')
const dotenv = require('dotenv').config()
const db = mongoose.connection
// Port
// Allow use of Heroku's port or your own local port, depending on your environment
const PORT = process.env.PORT || 3000
// require the schema
const Postcard = require('./models/postcards.js')
// require the seed data
const postcards = require('./models/seed.js')


// require sessions controller
const sessionsController = require('./controllers/sessions.js')
// require users controller
const userController = require('./controllers/users.js')
//Require Postcards Controller
const postcardsController = require('./controllers/postcards.js')

// Middleware- after config and dependencies but bedore routes
// use method override
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))
// use public folder for static asses, like css
app.use(express.static('public'))
// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
  secret: process.env.PORT,
  resave: false,
  saveUninitialized: false
}))

app.use('/users', userController)
app.use('/sessions', sessionsController)
// postcards controller middleware
app.use('/alpacapost', postcardsController)

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'alpacapost'

// // Connect to Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
// open the connection to mongo
db.on('open' , ()=>{
  console.log('connected to mongo');
});
// Listen
app.listen(PORT, ()=>{
  console.log('Listening on port: ', PORT);
})
