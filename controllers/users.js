const bcrypt = require('bcrypt')
const express= require('express')
const users = express.Router()
const User = require('../models/users.js')

// go to create new user
users.get('/new', (req, res)=>{
  res.render('users/new.ejs');
})

// create new user
users.post('/', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
    res.redirect('/alpacapost');
  })
})



module.exports = users;
