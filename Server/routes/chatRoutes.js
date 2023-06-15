const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController.js');
const auth = require('../middleware/authorization.js');

router.post('/', auth.isLoggedIn, chatController.createChat);
router.get('/', auth.isLoggedIn, chatController.getAllChats);
router.get('/:id', auth.isLoggedIn,chatController.getChatById);
router.delete('/:id', auth.isLoggedIn,chatController.deleteChatById);

router.get('/:id/Messages', auth.isLoggedIn,chatController.getAllMessages);
router.post('/:id/Messages', auth.isLoggedIn,chatController.createMessage);
module.exports = router;
