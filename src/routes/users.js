const express = require('express')
const userController = require('../controllers/users')
const router = express.Router()

router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .post('/register/admin', userController.registerAdmin)

module.exports = router
