const Report = require('../models/reportModel');
const Post =require('../models/postModel')
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
  factoryCreateOne,
} = require('./handlerFactory');
// CRUD
exports.getReportById = factoryGetOne(Report, [
  { path: 'userId',select:'username' },{
    path: 'reportEntityId',select:'title content ',
  }
 
]);

exports.createNewReport = factoryCreateOne(Report);
exports.getAllReports = factoryGetAll(Report);
exports.updateReport = factoryUpdateOne(Report);
exports.deleteReport = factoryDeleteOne(Report);






