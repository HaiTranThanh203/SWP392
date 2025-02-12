const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router
  .route('/')
  .get(reportController.getReportById); // Lấy tất cả báo cáo với phân trang
  
module.exports = router;
