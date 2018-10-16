const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// takes you to sign in page
sessions.get('/new', (req, res)=>{
  res.render('sessions/new.ejs')
  // res.send('new sessions page')
})

// // compare password on sign in
// sessions.post('/', (req, res)=>{
//   User.findOne({ username: req.body.username }, (err, foundUser)=>{
//     if (req.body.password == foundUser.password){
//       // res.send('logged in');
//       req.session.currentUser = foundUser;
//       res.redirect('/alpacapost');
//     } else {
//       res.send('wrong password');
//     }
//   })
// })

// compare password on login
sessions.post('/', (req, res)=>{
  User.findOne({ username: req.body.username }, (err, foundUser)=>{
    if (bcrypt.compareSync(req.body.password, foundUser.password) ){
      req.session.currentUser = foundUser;
      res.redirect('/alpacapost');
    } else {
      res.send('wrong password');
    }
  })
})

// log out/delete session
sessions.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/alpacapost');
  })
})





module.exports = sessions;
