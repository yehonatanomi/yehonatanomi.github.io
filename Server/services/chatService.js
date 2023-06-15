const Chat = require('../models/chat');

// Create a new message
async function createMessage(chatId, Sender, content) {
  const chat = await Chat.findOne({ _id: chatId });

  if (!chat) {
    throw new Error('Chat not found');
  }

  const message = {
    "sender": {
      "username": Sender
    },
    "content": content
  };

  chat.messages.unshift(message);
  await chat.save();

  return message;
}

// Create a new chat
async function createChat(users) {
  const messageList = [];
  try {
    const chat = new Chat({
      "users": users,
      "messages": messageList,
    });

    await chat.save();
    return chat;
  } catch (error) {
    throw new Error('Failed to create chat');
  }
}


// Get chat by ID
async function getChatById(id) {
  return await Chat.findOne({ _id: id });
}

// Delete chat by ID
async function deleteChatById(id) {
  try {
    const deletedChat = await Chat.findOneAndDelete({ _id: id });
    if (!deletedChat) {
      throw new Error('Chat not found');
    }
    return deletedChat;
  } catch (error) {
    throw new Error('Failed to delete chat');
  }
}

// Get all messages for a specific chat
async function getAllMessages(chatId) {
  const chat = await Chat.findOne({ _id: chatId });

  if (!chat) {
    throw new Error('Chat not found');
  }

  return chat.messages;
}

// Get the last message for a chat
async function getLastMessageForChat(chatId) {
  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (chat.messages.length === 0) {
      return null;
    }
    return chat.messages[0];
  } catch (error) {
    throw new Error('Failed to retrieve the last message for the chat');
  }
}

// Get all chats for a specific user
async function getAllChatsForUser(username) {
  try {
    return await Chat.find({ users: { $in: [username] } });
  } catch (error) {
    throw new Error('Failed to retrieve chats');
  }
}

module.exports = {
  createMessage,
  createChat,
  getChatById,
  deleteChatById,
  getAllMessages,
  getLastMessageForChat,
  getAllChatsForUser
};
