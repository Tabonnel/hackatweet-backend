const mongoose = require('mongoose');

const tweetsSchema = mongoose.Schema({
  username: String,
  firstname: String,
  content: String,
  date: Date,
  likeCount:Number,
  Image: String,
});

const Tweet = mongoose.model('tweets', tweetsSchema);

module.exports = Tweet;