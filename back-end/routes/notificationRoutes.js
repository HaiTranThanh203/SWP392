const express = require("express");
const { protect } = require("../controllers/authController");
const notificationController = require("../controllers/notificationController");
const router = express.Router();
router
  .route("/")
  .get(notificationController.getMyNotifications)
  .post(notificationController.createNewNotification);
router
  .route("/:id")
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);
module.exports = router;

module.exports = router;
