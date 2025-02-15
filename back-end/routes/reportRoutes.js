const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router
  .route('/')
  .get(reportController.getAllReportsPaginate); // Lấy tất cả báo cáo với phân trang
  router.get('/stats', reportController.getReportStats); // Lấy thống kê báo cáo

// Route để vô hiệu hóa bài viết được báo cáo
router.patch('/deactivate-report-post/:postId', reportController.deactivateReportedPost);
router.post('/', reportController.createNewReport);
router.patch('/:reportId', reportController.getReportById);
module.exports = router;
