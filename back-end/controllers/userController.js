const User = require('../models/userModel');
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require('./handlerFactory');
// CRUD
exports.getUserById = factoryGetOne(User);
exports.createNewUser = factoryCreateOne(User);
exports.getAllUsers = factoryGetAll(User);
exports.updateUser = factoryUpdateOne(User);
exports.deleteUser = factoryDeleteOne(User);

exports.getAllUsersPaginate = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, status, email, username } = req.query;

  // Define filter criteria based on query parameters
  let filter = {};
  if (status) filter.status = status;
  if (email) filter.email = email;
  if (username) filter.username = new RegExp(username, 'i');

  // Apply filters and explicitly set the noIsActiveFilter flag to bypass isActive filtering
  const features = new APIFeatures(
    User.find(filter)
      .setOptions({ noIsActiveFilter: true }) // Disable isActive filtering
      .select('username email role studentCode isActive'),
    req.query
  )
    .sort()
    .paginate();

  // Execute the query for paginated users
  const users = await features.query;

  // Get the total number of matching documents
  const totalUsers = await User.countDocuments(filter);

  // Get the count of active and inactive users
  const activeUsersCount = await User.countDocuments({
    ...filter,
    isActive: true,
  });
  const inactiveUsersCount = await User.countDocuments({
    ...filter,
    isActive: false,
  });

  // Send response
  res.status(200).json({
    results: users.length,
    total: totalUsers,
    activeUsersCount,
    inactiveUsersCount,
    totalPages: Math.ceil(totalUsers / limit),
    data: users,
  });
});
exports.toggleUserActiveStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the user by ID, bypassing the `isActive` filter and selecting it explicitly
  const user = await User.findOne({ _id: id })
    .setOptions({ noIsActiveFilter: true })
    .select('+isActive');

  if (!user) {
    return next(new AppError(`No user found with ID ${id}`, 404));
  }

  // Toggle the `isActive` status
  user.isActive = !user.isActive;
  await user.save();

  // Response after successful update
  res.status(200).json({
    status: 'success',
    message: `User status has been updated to ${
      user.isActive ? 'active' : 'inactive'
    }.`,
    data: {
      user,
    },
  });
});
exports.searchUsers = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      status: 'fail',
      message: 'Query parameter is required for searching',
    });
  }

  // Tìm kiếm theo displayName
  const searchFilter = { username: new RegExp(query, 'i') };

  const users = await User.find(searchFilter)
    .select('username displayName email avatar') // Chỉ lấy các trường cần thiết
    .limit(10);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});