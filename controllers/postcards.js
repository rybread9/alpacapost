//Dependencies
const express = require('express');
const alpacapost = express.Router();
// require the schema
const Postcard = require('../models/postcards.js');
// require seed data
const postcards = require('../models/seed.js')
const User = require('../models/users.js')



// index
alpacapost.get('/', (req, res)=>{
  // find all postcards
  Postcard.find({}, (error, allPostcards)=>{
    // render index page
    res.render('index.ejs', {
      // passes found postcards to index page
      postcards: allPostcards,
      currentUser: req.session.currentUser
    })
  })
})

// about get route
alpacapost.get('/about', (req, res)=>{
  // res.send('ABOUT');
  res.render('about.ejs', {
    currentUser: req.session.currentUser
  })
})

// SEED ROUTE
alpacapost.get('/seed', (req, res)=>{
  Postcard.create(postcards, (err, createdPostcard)=>{
    res.redirect('/alpacapost')
  })
})

// create postcard
alpacapost.post('/', (req, res)=>{
  Postcard.create(req.body, (error, createdPostcard)=>{
    res.redirect('/alpacapost')
    // res.send('you created a thing!')
  })
})



// new
alpacapost.get('/new', (req, res)=>{
  res.render('new.ejs', {
    currentUser: req.session.currentUser
  })
})



// show
alpacapost.get('/:id', (req, res)=>{
  // req.body.author = req.session.currentUser.username;
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('show.ejs',
    {
      postcard: foundPostcard,
      currentUser: req.session.currentUser
      // postcard: postcards[req.params.id],
      // index: [req.params.id]
    })
  })
})



// DELETE ROUTE
alpacapost.delete('/:id', (req, res)=>{
  Postcard.findByIdAndDelete(req.params.id, (err, data)=>{
    res.redirect('/alpacapost');//redirect back to store index
  })
});



// edit route
alpacapost.get('/:id/edit', (req, res)=>{
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('edit.ejs', {
      // postcard: postcards[req.params.id]
      postcard: foundPostcard,
      currentUser: req.session.currentUser
    })
  })
})



// Update edit put route
alpacapost.put('/:id', (req, res)=>{
  Postcard.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPostcard)=>{
    res.render('show.ejs', {
      postcard: updatedPostcard,
      currentUser: req.session.currentUser
    })
  })
})



module.exports = alpacapost;
