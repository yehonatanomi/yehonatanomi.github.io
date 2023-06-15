const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: Number,
  created: { type: Date, default: Date.now },
  sender: {
    username: String
  },
  content: String,
}, {
  collection: 'Message',
  _id: false // Exclude _id field from the Message schema to avoid duplicate _id fields in the Chat schema
});

const ChatSchema = new mongoose.Schema({
  users: [{
    type: String
}],
  messages: [messageSchema], // Reference the messageSchema directly as the type
}, {
  collection: 'Chat'
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
