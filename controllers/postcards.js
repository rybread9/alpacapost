//Dependencies
const express = require('express');
const postcards = express.Router();
const Postcards = require('../models/postcards.js')

// Routes
// // index
// postcards.get('/', (req, res)=>{
//   // Postcard.find({}, (error, allPostcards)=>{
//     res.render('index.ejs', {
//       postcards: Postcards
//     })
//   // })
// })






module.exports = postcards;
