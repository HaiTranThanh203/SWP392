const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync'); // Hàm wrapper xử lý async, error
const APIFeatures = require('../utils/apiFeatures'); // Class hỗ trợ lọc, sắp xếp, phân trang,...
const { getIo } = require('../socket');

// Controller gửi tin nhắn
exports.sendMessage = catchAsync(async (req, res, next) => {
  const { sender, recipient, content } = req.body;

  // Tạo và lưu tin nhắn vào MongoDB
  const message = await Message.create({ sender, recipient, content });

  // Lấy instance của socket.io và phát tin nhắn tới phòng của người nhận và người gửi
  const io = getIo();
  io.to(recipient).emit('newMessage', message);
  io.to(sender).emit('newMessage', message);

  res.status(201).json({
    success: true,
    data: message
  });
});

// Controller lấy tin nhắn với phân trang
exports.getMessages = catchAsync(async (req, res, next) => {
    // Lấy sender và recipient từ query string
    const { sender, recipient } = req.query;
    
    if (!sender || !recipient) {
      return res.status(400).json({
        success: false,
        message: 'Cần truyền đầy đủ sender và recipient để lấy tin nhắn giữa 2 người'
      });
    }
    
    // Tạo bộ lọc lấy tin nhắn giữa 2 người (theo cả 2 chiều)
    const filter = {
      $or: [
        { sender: sender, recipient: recipient },
        { sender: recipient, recipient: sender }
      ]
    };
    
    // Đặt mặc định limit = 15 nếu không có tham số limit từ client
    if (!req.query.limit) req.query.limit = 15;
    
    // Đếm tổng số tin nhắn phù hợp với filter
    const totalMessages = await Message.countDocuments(filter);
    
    // Áp dụng các tính năng lọc, sắp xếp, giới hạn trường và phân trang
    const features = new APIFeatures(Message.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const messages = await features.query;
    
    res.status(200).json({
      results: messages.length,
      total: totalMessages,
      totalPages: Math.ceil(totalMessages / req.query.limit),
      data: messages
    });
  });
// Hàm đánh dấu tin nhắn đã đọc
exports.markMessagesAsRead = catchAsync(async (req, res, next) => {
  // Giả sử client gửi sender và recipient để xác định cuộc trò chuyện
  const { sender, recipient } = req.body;
  
  if (!sender || !recipient) {
    return res.status(400).json({
      success: false,
      message: 'Cần truyền sender và recipient'
    });
  }
  
  // Cập nhật tất cả tin nhắn từ sender đến recipient mà chưa được đọc
  const result = await Message.updateMany(
    { sender: sender, recipient: recipient, isRead: false },
    { isRead: true }
  );
  
  // (Tùy chọn) Phát sự kiện qua socket cho người gửi để thông báo tin nhắn đã đọc
  const io = getIo();
  io.to(sender).emit('messagesRead', { recipient, updatedCount: result.nModified });
  
  res.status(200).json({
    success: true,
    updatedCount: result.nModified
  });
});