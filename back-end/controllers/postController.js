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
      return res
        .status(400)
        .json({ status: "fail", message: "ID không hợp lệ!" });
    }

    const post = await Post.findOne({ _id: req.params.id })
      .populate("userId", "username avatar email")
      .populate("communityId", "name");

    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Bài viết không tồn tại!" });
    }

    res.status(200).json({ status: "success", data: post });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Lỗi server", error: error.message });
  }
};

// Controller xử lý tạo bài viết mới với multer
exports.createNewPost = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized: Token required" });
    }

    let imageUrl =
      req.body.media && req.body.media.length > 0 ? req.body.media[0] : "";

    const newPost = new Post({
      communityId: req.body.communityId,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      media: imageUrl ? [imageUrl] : [],
    });

    await newPost.save();

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

exports.getAllPosts = factoryGetAll(Post);
exports.updatePost = factoryUpdateOne(Post);

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
exports.votePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post.votes) post.votes = new Map();
  if (req.body.vote == "none") {
    post.votes.delete(req.user.id);
  } else {
    post.votes.set(req.user.id, req.body.vote);
  }
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { votes: post.votes },
    { new: true }
  );
  res.status(200).json(updatedPost);
});
