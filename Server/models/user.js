const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  displayName: String,
  profilePic: String,
}, {
  collection: 'User'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
