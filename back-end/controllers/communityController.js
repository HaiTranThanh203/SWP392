const Community = require('../models/communityModel');
const Post = require('../models/postModel');
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const subscriptionController = require('./subscriptionController');
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require('./handlerFactory');
exports.searchCommunities = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      status: 'fail',
      message: 'Query parameter is required for searching',
    });
  }

  // Tìm kiếm theo name của community
  const searchFilter = { name: new RegExp(query, 'i') };

  const communities = await Community.find(searchFilter)
    .select('name description logo memberCount') // Chỉ lấy các trường cần thiết
    .limit(100); // Giới hạn số lượng kết quả trả về

  res.status(200).json({
    status: 'success',
    results: communities.length,
    data: communities,
  });
});
// CRUD
exports.getCommunityById = factoryGetOne(Community);
exports.createNewCommunity = factoryCreateOne(Community);
exports.getAllCommunities = factoryGetAll(Community);
exports.updateCommunity = factoryUpdateOne(Community);
exports.deleteCommunity = factoryDeleteOne(Community);