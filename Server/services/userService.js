const User = require('../models/user');

async function createUser(username, password, displayName, profilePic) {
  try {
    const newUser = new User({
      "username": username,
      "password": password,
      "displayName": displayName,
      "profilePic": profilePic
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error);
  }
}


// Get all users
async function getAllUsers() {
  return await User.find();
}

// Get a user by their username
async function getUserByUsername(username) {
  return await User.findOne({username: username });
}

async function exists(username, password) {
  const user = await User.findOne({ username: username, password: password });
  if(user){
    return true;
  }
  return false;
}


module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  exists
};
