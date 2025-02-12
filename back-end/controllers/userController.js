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

