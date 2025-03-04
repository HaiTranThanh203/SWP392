const express = require("express");
const router = express.Router();

const communityController = require("../controllers/communityController");
router.route("/").get(communityController.getAllCommunities);  // Lấy tất cả cộng đồng
router.route("/:id").get(communityController.getCommunityById);  // Lấy chi tiết cộng đồng theo id
router.route("/create").post(communityController.createNewCommunity);
router.route("/join").post(communityController.addUserById);
router.route("/access/:id").patch(communityController.accessRequest);
router.route("/edit/:id").patch(communityController.updateCommunity);
router.route("/request/:id").patch(communityController.addRequest);
router.route("/get-post/:id").get(communityController.getPostInCommunity);
router.route("/search").get(communityController.searchCommunities);  // Tìm kiếm community





module.exports = router;
