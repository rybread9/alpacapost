// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
// Port
// Allow use of Heroku's port or your own local port, depending on your environment
const PORT = process.env.PORT || 3000

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'crud_app'

// Connect to Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

// Middleware- after config and dependencies but bedore routes
// use public folder for static asses, like css
app.use(express.static('public'))
// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended:false}))

// use method override
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))

// Routes
app.get('/', (req, res)=>{
  res.send('Hello world!')
})

// Listen
app.listen(PORT, ()=>{
  console.log('Listening on port: ', PORT);
})
