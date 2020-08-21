const express = require('express')
const productController = require('../controllers/products')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const redis = require('../middlewares/redis')

router
  .get('/:id', verifyAccess, productController.getProductById)
  .get('/', verifyAccess, redis.cacheGetAllProduct, productController.getAllproduct)
  .post('/', verifyAccess, redis.clearGetAllProduct, multer.upload.single('image'), productController.insertProduct)
  .patch('/:id', verifyAccess, productController.updateProduct)
  .delete('/:id', verifyAccess, productController.deleteProduct)

module.exports = router
