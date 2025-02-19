const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
router.route("/create").post(communityController.createNewCommunity);
router.route("/join").post(communityController.addUserById);
router.route("/access/:id").patch(communityController.accessRequest);
router.route("/request/:id").patch(communityController.addRequest);
router.route("/get-post/:id").get(communityController.getPostInCommunity);
module.exports = router;
