const express = require('express')
const historyController = require('../controllers/histories')
const router = express.Router()
const { verifyAccess, verifyAccessAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
const redis = require('../middlewares/redis')

router
  .get('/:id', verifyAccess, historyController.getHistoryById)
  .get('/', verifyAccess, redis.cacheGetAllProduct, historyController.getAllhistory)
  .post('/', verifyAccessAdmin, redis.clearGetAllProduct, upload, historyController.insertHistory)
  .patch('/:id', verifyAccessAdmin, upload, historyController.updateHistory)
  .delete('/:id', verifyAccessAdmin, historyController.deleteHistory)

module.exports = router
