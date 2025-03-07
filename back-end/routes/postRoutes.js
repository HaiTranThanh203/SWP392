const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../controllers/authController");


router.route("/").get(postController.getAllPosts);
router.use(protect);
router.route("/create").post(postController.createNewPost);
router.route("/search").get(postController.filterPostsByTitle);
router.route("/edit/:id").patch(postController.updatePost);
router.route("/:id").get(protect, postController.getPostById);
router.route("/:id/vote").patch(protect, postController.votePost);

module.exports = router;
