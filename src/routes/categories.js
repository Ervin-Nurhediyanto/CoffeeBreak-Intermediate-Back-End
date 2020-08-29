const express = require('express')
const categoryController = require('../controllers/categories')
const router = express.Router()
const { verifyAccess, verifyAccessAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
// const redis = require('../middlewares/redis')

router
  .get('/:id', verifyAccess, categoryController.getCategoryById)
  .get('/', verifyAccess, categoryController.getAllcategory)
  .post('/', verifyAccessAdmin, upload, categoryController.insertCategory)
  .patch('/:id', verifyAccessAdmin, upload, categoryController.updateCategory)
  .delete('/:id', verifyAccessAdmin, categoryController.deleteCategory)
// .get('/', verifyAccess, redis.cacheGetAllCategory, categoryController.getAllcategory)
// .post('/', verifyAccessAdmin, redis.clearGetAllCategory, upload, categoryController.insertCategory)
module.exports = router
