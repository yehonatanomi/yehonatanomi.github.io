const jwt = require('jsonwebtoken');
const auth = require('../middleware/authorization.js');
const chatService = require('../services/chatService');
const userService = require('../services/userService');

// Create a new message
async function createMessage(req, res) {
  const { id } = req.params;
  const content = req.body.msg;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, auth.key);
  const sender = decodedToken.username;

  try {
    const message = await chatService.createMessage(id, sender, content);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
}

// Get all messages
async function getAllMessages(req, res) {
  const { id } = req.params;

  try {
    const messages = await chatService.getAllMessages(id);
    res.send(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
}


// Create a new chat
async function createChat(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, auth.key);
  const sender = decodedToken.username;
  const receiver = req.body.username;
  const users = [sender, receiver];
  
  try {
    const user = await userService.getUserByUsername(receiver);
    if(!user){
      throw new Error('Failed to create chat');
    }
    if(sender === receiver){
      throw new Error('Failed to create chat');
    }
    const chat = await chatService.createChat(users);
    
    const response = {
      "id": chat._id,
      "user": {
        "username": user.username,
        "displayName": user.displayName,
        "profilePic": user.profilePic
      },
      "lastMessage": null
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
}



// Get all chats for the currently logged-in user
async function getAllChats(req, res) {
  // Extract the username from the token
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, auth.key);
  const username = decodedToken.username;

  try {
    const chats = await chatService.getAllChatsForUser(username);
    const chatList = [];

    for (const chat of chats) {
      let other = "";
      if(chat.users[1] === username){
        other = chat.users[0]
      }
      else{
        other = chat.users[1];
      }
      const user = await userService.getUserByUsername(other);
      const lastMessage = await chatService.getLastMessageForChat(chat._id);
      if(lastMessage !== null){
      const chatItem = {
        "id": chat._id,
        "user": {
          "username": user.username,
          "displayName": user.displayName,
          "profilePic": user.profilePic
        },
        "lastMessage": lastMessage
      };
      chatList.push(chatItem);
    }
    else {
      const chatItem = {
        "id": chat.id,
        "user": {
          "username": user.username,
          "displayName": user.displayName,
          "profilePic": user.profilePic
        },
        "lastMessage": null
        }
        chatList.push(chatItem);
      };
    }

    res.status(200).send(chatList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chats' });
  }
}

// Get a chat by ID
async function getChatById(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, auth.key);
  const username = decodedToken.username;

  try {
    const chat = await chatService.getChatById(id, username);
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chat' });
  }
}

// Delete a chat by ID
async function deleteChatById(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, auth.key);
  const username = decodedToken.username;
  const { id } = req.params;

  try {
    const deletedChat = await chatService.deleteChatById(id, username);
    res.json(deletedChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
}

module.exports = {
  createMessage,
  getAllMessages,
  createChat,
  getAllChats,
  getChatById,
  deleteChatById
};
