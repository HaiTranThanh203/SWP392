const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route POST: Gửi tin nhắn
router.post('/', messageController.sendMessage);

// Route GET: Lấy danh sách tin nhắn với phân trang
// Ví dụ truy cập: /api/messages?userId=<user_id>&limit=15&page=1
router.get('/', messageController.getMessages);
router.post('/mark-as-read', messageController.markMessagesAsRead);
module.exports = router;
