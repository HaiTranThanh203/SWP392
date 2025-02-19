const express = require("express");
const reportController = require("../controllers/reportController");
const router = express.Router();

router
  .route("/")
  .get(reportController.getReportById)
  .post(reportController.createNewReport); // Lấy tất cả báo cáo với phân tra
module.exports = router;
