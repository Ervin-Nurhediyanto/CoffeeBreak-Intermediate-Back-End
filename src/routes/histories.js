const express = require('express')
const historyController = require('../controllers/histories')
const router = express.Router()

router
  .get('/:id', historyController.getHistoryById)
  .get('/', historyController.getAllhistory)
  .post('/', historyController.insertHistory)
  .patch('/:id', historyController.updateHistory)
  .delete('/:id', historyController.deleteHistory)

module.exports = router
