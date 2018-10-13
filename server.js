// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
// Port
// Allow use of Heroku's port or your own local port, depending on your environment
const PORT = process.env.PORT || 3000
// require the schema
const Postcard = require('./models/postcards.js')
// require the seed data
const postcards = require('./models/seed.js')


// Controller Middleware
// const postcardsController = require('./controllers/postcards.js')
// app.use('/postcards', postcardsController)

// Middleware- after config and dependencies but bedore routes
// use method override
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))
// use public folder for static asses, like css
app.use(express.static('public'))
// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended:false}))



// middleware for postcardsController
// app.use('/postcards', postcardsController)

// index
app.get('/alpacapost', (req, res)=>{
  Postcard.find({}, (error, allPostcards)=>{
    res.render('index.ejs', {
      postcards: allPostcards
    })
  })
})

// require seed data
// const seed = require('./models/seed.js');

// SEED ROUTE
app.get('/alpacapost/seed', (req, res)=>{
  Postcard.create(postcards, (err, createdPostcard)=>{
    res.redirect('/alpacapost')
  })
})

// create postcard
app.post('/alpacapost', (req, res)=>{
  Postcard.create(req.body, (error, createdPostcard)=>{
    res.redirect('/alpacapost')
    // res.send('you created a thing!')
  })
})

// new
app.get('/alpacapost/new', (req, res)=>{
  res.render('new.ejs')
})

// show
app.get('/alpacapost/:id', (req, res)=>{
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('show.ejs',
    {
      postcard: foundPostcard
      // postcard: postcards[req.params.id],
      // index: [req.params.id]
    })
  })
})

// DELETE ROUTE
app.delete('/alpacapost/:id', (req, res)=>{
  Postcard.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/alpacapost');//redirect back to store index
  })
});

// edit route
app.get('/alpacapost/:id/edit', (req, res)=>{
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('edit.ejs', {
      // postcard: postcards[req.params.id]
      postcard: foundPostcard
    })
  })
})

// Update edit put route
app.put('/alpacapost/:id', (req, res)=>{
  Postcard.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPostcard)=>{
    res.render('show.ejs', {
      postcard: updatedPostcard
    })
  })
})



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
