const express = require('express');
const newsController = require('../controllers/newsController');
const router = express.Router();
router
  .route('/list')
  .get(newsController.getAllNewsPaginate)
  .post(newsController.createNewReport);
router.get('/:id', newsController.getNewsById);
router.patch('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);
module.exports = router;