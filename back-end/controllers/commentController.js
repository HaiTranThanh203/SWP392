const Comment = require("../models/commentModel");
const Notification = require("../models/notificationModel");
const Post = require("../models/postModel");
const { getIo } = require("../socket");
const catchAsync = require("../utils/catchAsync");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require("./handlerFactory");
// CRUD
exports.getCommentById = async (req, res, next) => {
  try {
    const doc = await Comment.findById(req.params.id)
      .populate("userId")
      .populate("postId")
      .populate("parentId")
      .populate("childrens");
    if (!doc) {
      return next(
        new AppError(`No document found with ID ${req.params.id}`, 404)
      );
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.createNewComment = async (req, res, next) => {
  try {
    const doc = await Comment.create(req.body);
    if (doc.parentId) {
      await Comment.findByIdAndUpdate(doc.parentId, {
        $addToSet: { childrens: doc._id },
      });
    }
    await Post.findByIdAndUpdate(doc.postId, {
      $inc: { commentCount: 1 },
    });
    const populatedDoc = await Comment.findById(doc._id).populate("userId");
    if (populatedDoc.tagInfo) {
      const io = getIo();
      const notification = await Notification.create({
        userId: doc.tagInfo.userId,
        resourceId: `comments/${populatedDoc._id}`,
        notifType: "Tag",
        title: "Replied",
        description: `User ${req.body.id} has just tag you in a comment.`,
      });
      io.emit("newNotification", notification);
    }
    res.status(201).json(populatedDoc);
  } catch (error) {
    next(error);
  }
};

/**
 * Cập nhật 1 bình luận
 * @param {string} req.params.id - ID của bình luận
 * @param {object} req.body - Nội dung mới của bình luận
 * @return {object} bình luận đã được cập nhật
 */
exports.updateComment = async (req, res, next) => {
  const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(
      new AppError(`No document found with ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json(doc);
};

exports.deleteComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findById(req.params.id);
  let deleteCount = 1;
  if (doc.hasParent) {
    await Comment.findByIdAndUpdate(doc.parentId, {
      $pull: { childrens: doc._id },
    });
  } else {
    deleteCount = (await Comment.deleteMany({ parentId: doc._id })) + 1;
  }
  await Post.findByIdAndUpdate(doc.postId, {
    $inc: { commentCount: -deleteCount },
  });
  res.status(204).json({ status: success, count: deleteCount });
});
const mongoose = require("mongoose");

/**
 * Lấy danh sách bình luận cho 1 bài viết
 * @param {string} postId - ID của bài viết
 * @returns {Promise<import("express").Response>} - Danh sách bình luận
 */
exports.getCommentByPostId = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Kiểm tra postId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "name avatar email") // Chỉ lấy thông tin cần thiết
      .populate("parentId")
      .populate("childrens")
      .sort({createAt: -1});

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bình luận cho bài viết này" });
    }

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

exports.getAllComments = catchAsync(async (req, res, next) => {
  console.log("Inside getAll Comments");
  const { postId } = req.params;
  const { limit = 1, startAfter } = req.query;
  const limitNumber = parseInt(limit, 10);
  const query = { postId };
  query.hasParent = false;
  if (startAfter) {
    query._id = { $gt: startAfter }; // Fetch comments with ID greater than startAfter
  }
  const comments = await Comment.find(query)
    .limit(limitNumber)
    .populate("userId")
    .populate({ path: "childrens", populate: { path: "userId" } })
    .lean()
    .sort({ createdAt: 1 })
    .exec();
  const response = {
    data: comments,
  };
  if (comments.length > 0) {
    response.startAfter = comments[comments.length - 1]._id; // Set newStartAfter to the last comment's ID
  }
  res.status(200).json(response);
});

exports.getChildrenComments = catchAsync(async (req, res, next) => {
  const { parentId } = req.params;
  const { limit = 1, startAfter } = req.query;
  const limitNumber = parseInt(limit, 10);
  const query = { parentId };
  if (startAfter) {
    query._id = { $gt: startAfter }; // Fetch comments with ID greater than startAfter
  }
  const comments = await Comment.find(query)
    .limit(limitNumber)
    .lean()
    .sort({ createdAt: 1 })
    .exec();
  const response = {
    data: comments,
  };
  if (comments) {
    response.startAfter = comments[comments.length - 1]._id; // Set newStartAfter to the last comment's ID
  }
  res.status(200).json(response);
});

exports.voteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment.votes) comment.votes = new Map();
  if (req.body.vote == "none") {
    comment.votes.delete(req.body.id);
  } else {
    comment.votes.set(req.body.id, req.body.vote);
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { votes: comment.votes },
    { new: true }
  ).lean();
  res.status(200).json(updatedComment);
});
