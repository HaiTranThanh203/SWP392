const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  protect,
  changePassword,
  logout,
} = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.put("/change-password", protect, changePassword);
router.get("/logout", logout);
const userController = require("../controllers/userController");
router.get("/list", userController.getAllUsersPaginate);
router.get("/search", userController.searchUsers);
// Endpoint tìm kiếm user với flag isFriend
// Ví dụ: GET http://localhost:9999/api/users/search?keyword=abc&userId=YOUR_USER_ID
router.get("/search2", userController.searchUsers);
router.get("/profile", protect, userController.getUserProfile);
router.patch("/:id/toggle-active", userController.toggleUserActiveStatus);
router.patch("/update-me", protect, userController.updateMe);

router.get("/:id", userController.getUserById);

module.exports = router;
