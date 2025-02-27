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
exports.getPostById = factoryGetOne(Post, "communityId userId");
exports.createNewPost = factoryCreateOne(Post);
exports.getAllPosts = factoryGetAll(Post);
exports.updatePost = factoryUpdateOne(Post);
//Nhận thông tin bài viết theo id param và phần id user trong body và vote trong body true là like false là dislike và none là xóaxóa
exports.votePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post.votes) post.votes = new Map();
  if (req.body.vote == "none") {
    post.votes.delete(req.body.id);
  } else {
    post.votes.set(req.body.id, req.body.vote);
  }
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { votes: post.votes },
    { new: true }
  );
  res.status(200).json(updatedPost);
});
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
