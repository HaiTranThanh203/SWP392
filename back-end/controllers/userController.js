const User = require("../models/userModel");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
// CRUD
const filterObj = (obj, ...excluded) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (!excluded.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password update!", 400));
  }
  const filterBody = filterObj(req.body, "isActive");
  if (req.file) filterBody.avatar = req.file.name;
  const updatedUser = await User.findByIdAndUpdate(req.body.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});
exports.getUserById = factoryGetOne(User);
exports.createNewUser = factoryCreateOne(User);
exports.getAllUsers = factoryGetAll(User);
exports.updateUser = factoryUpdateOne(User);
exports.deleteUser = factoryDeleteOne(User);
