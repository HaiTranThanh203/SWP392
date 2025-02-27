const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
router
  .route('/')
  router.get('/search', communityController.searchCommunities);  // Tìm kiếm community

module.exports = router;
