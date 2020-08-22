const express = require('express')
const productController = require('../controllers/products')
const router = express.Router()
const { verifyAccess, verifyAccessAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
const redis = require('../middlewares/redis')

router
  .get('/:id', verifyAccess, productController.getProductById)
  .get('/', verifyAccess, redis.cacheGetAllProduct, productController.getAllproduct)
  .post('/', verifyAccessAdmin, redis.clearGetAllProduct, upload, productController.insertProduct)
  .patch('/:id', verifyAccessAdmin, productController.updateProduct)
  .delete('/:id', verifyAccessAdmin, productController.deleteProduct)

module.exports = router
