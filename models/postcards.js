const mongoose = require('mongoose');

const postcardSchema = new mongoose.Schema ({
  frontImage: String,
  backImage: String,
  sendToName: String,
  sendToEmail: String,
  message: String,
  sendFromName: String
})

const Postcards = mongoose.model('Postcards', postcardSchema);

module.exports = Postcard;
