const mongoose = require('mongoose');

const postcardSchema = new mongoose.Schema ({
  frontImage: String,
  backImage: String,
  sendToName: String,
  sendToEmail: String,
  message: String,
  sendFromName: String
})

const Postcard = mongoose.model('Postcard', postcardSchema);

module.exports = Postcard;
