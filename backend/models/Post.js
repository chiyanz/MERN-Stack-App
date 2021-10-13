const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Scheme({
  subject: String,
  description: String 
});

module.exports = mongoose.model("Post", postSchema);