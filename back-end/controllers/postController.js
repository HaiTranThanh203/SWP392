const mongoose = require("mongoose");
const Community = require("../models/communityModel");
const Post = require("../models/postModel");
const Subscription = require("../models/subscriptionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require("./handlerFactory");

// // Get feed for guest users
const Comment = require("../models/commentModel");
// CRUD

exports.getPostById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ status: "fail", message: "Invalid Post ID!" });
    }

    const post = await Post.findById(req.params.id)
      .populate("userId", "username avatar email") // ✅ Ensure user data is populated
      .populate("communityId", "name");

    if (!post) {
      return res.status(404).json({ status: "fail", message: "Post not found!" });
    }

    res.status(200).json({ status: "success", data: post });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error", error: error.message });
  }
};


// Controller xử lý tạo bài viết mới với multer
exports.createNewPost = catchAsync(async (req, res, next) => {
  let imageUrl = '';

  // Nếu có file ảnh, xử lý upload
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  const newPost = new Post({
    communityId: req.body.communityId,
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    media: imageUrl ? [imageUrl] : [],  // Lưu URL của ảnh vào mảng media
  });

  await newPost.save();

  res.status(201).json({
    status: 'success',
    data: newPost,
  });
});

exports.getAllPosts = factoryGetAll(Post);
exports.updatePost = factoryUpdateOne(Post);
//Nhận thông tin bài viết theo id param và phần id user trong body và vote trong body true là like false là dislike và none là xóaxóa
exports.votePost = async (req, res, next) => {
  try {
    console.log("Received vote request:", req.body); // ✅ LOG REQUEST BODY

    const { id } = req.params;
    const { userId, vote } = req.body;

    // Ensure request data is valid
    if (!userId || !["like", "dislike", "none"].includes(vote)) {
      console.error("Invalid vote data:", req.body); // ✅ LOG INVALID DATA
      return res.status(400).json({ status: "fail", message: "Invalid request data." });
    }

    // Find post by ID
    const post = await Post.findById(id);
    if (!post) {
      console.error("Post not found:", id); // ✅ LOG IF POST NOT FOUND
      return res.status(404).json({ status: "fail", message: "Post not found." });
    }

    // Initialize votes if undefined
    if (!post.votes) {
      post.votes = new Map();
    }

    // Process the vote
    if (vote === "none") {
      post.votes.delete(userId); // Remove vote
    } else {
      post.votes.set(userId, vote); // Add/update vote
    }

    // Count votes
    let upVotes = 0, downVotes = 0;
    post.votes.forEach((v) => {
      if (v === "like") upVotes++;
      if (v === "dislike") downVotes++;
    });

    // Update post with new counts
    post.upVotes = upVotes;
    post.downVotes = downVotes;

    console.log("Updated votes:", { upVotes, downVotes }); // ✅ LOG UPDATED VOTES

    // Save the post
    await post.save();

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("❌ Error in votePost:", error); // ✅ LOG ERROR DETAILS
    return res.status(500).json({ status: "fail", message: "Internal server error." });
  }
};



/**
 * @route   GET /api/v1/posts/filter
 * @desc    Filter posts by title
 * @access  Public
 * @query   keyword: string
 * @example /api/v1/posts/filter?keyword=example
 * @return  { success: boolean, results: number, data: Post[] }
 */
exports.filterPostsByTitle = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Keyword query is required" });
    }

    const posts = await Post.find({
      title: { $regex: keyword, $options: "i" }, // Tìm kiếm title chứa từ khóa (không phân biệt chữ hoa/thường)
      isActive: true, // Chỉ lấy bài viết đang hoạt động
    })
      .populate("userId", "name") // Lấy thông tin người đăng bài
      .populate("communityId", "name"); // Lấy thông tin cộng đồng

    res.status(200).json({ success: true, results: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


