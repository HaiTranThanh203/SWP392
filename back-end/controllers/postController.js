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
