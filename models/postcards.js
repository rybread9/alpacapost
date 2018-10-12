const mongoose = require('mogoose');

const postcardSchema = mongoose.Schema ({
  frontImage: String,
  backImage: String,
  sendToName: String,
  sendToEmail: String,
  message: String,
  from: String
})

const Postcard = mongoose.model('Postcard', postcardSchema);

module.exports = Postcard;
