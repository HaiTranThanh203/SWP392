const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

// 🔹 Sử dụng `.route()` để nhóm các phương thức liên quan
router
  .route('/')
  .get(reportController.getAllReportsPaginate)  // Lấy tất cả báo cáo với phân trang
  .post(reportController.createNewReport);      // Tạo báo cáo mới

// Lấy thống kê báo cáo
router.get('/stats', reportController.getReportStats);



// Vô hiệu hóa bài viết được báo cáo
router.patch('/deactivate-report-post/:postId', reportController.deactivateReportedPost);
// Lấy báo cáo theo ID
router.get('/:id', reportController.getReportById);
module.exports = router;
