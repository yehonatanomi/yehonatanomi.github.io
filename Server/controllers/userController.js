const userService = require('../services/userService');

// Create a new user
async function CreateUser(req, res) {
  const { username, password, displayName, profilePic } = req.body;
  const userFound = await userService.getUserByUsername(username);
  if(userFound){
    return res.status(409).json({error: 'username already taken!'})
  }

  try {
    const user = await userService.createUser(username, password,displayName, profilePic);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

// Get a user by their username
async function getUserByUsername(req, res) {
  const { username } = req.params;

  try {
    const user = await userService.getUserByUsername(username);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

module.exports = {
  CreateUser,
  getAllUsers,
  getUserByUsername
};
