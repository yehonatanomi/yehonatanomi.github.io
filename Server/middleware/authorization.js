const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const key = "ap2 is the best course on earth!";

// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If the request has an authorization header
  if (authHeader) {
    // Extract the token from that header
    const token = authHeader.split(' ')[1];
    try {
      // Verify the token is valid
      const data = jwt.verify(token, key);
      // Token validation was successful. Continue to the actual function (index)
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ error: 'Token required' });
  }
};

async function processLogin(req, res) {
  const { username, password } = req.body;
  const doExist = await userService.exists(username, password);
  if (doExist) {
    const data = { username: username };
    const token = jwt.sign(data, key);
    res.status(200).send(token);
  } else {
    res.status(404).header('Content-Type', 'text/plain; charset=utf-8').send('Incorrect username and/or password');
  }
};

module.exports = {
  isLoggedIn,
  processLogin,
  key,
};
