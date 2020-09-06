const modelUser = require('../models/users')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  register: (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const data = {
      email,
      password,
      firstName,
      lastName,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.register(data)
          .then((result) => {
            if (result == 'email sudah terdaftar') {
              helpers.response(res, null, result, 403, 'Forbidden')
            } else {
              helpers.response(res, null, 'Register User Success', 201, null)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },

  registerAdmin: (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const data = {
      email,
      password,
      firstName,
      lastName,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.register(data)
          .then((result) => {
            if (result == 'email sudah terdaftar') {
              helpers.response(res, null, result, 403, 'Forbidden')
            } else {
              helpers.response(res, null, 'Register Admin Success', 201, null)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },

  login: (req, res) => {
    const { email, password } = req.body
    modelUser.login(email)
      .then((result) => {
        if (result.length < 1) return helpers.response(res, null, 'email not found!!', 404, null)

        const user = result[0]
        const hash = user.password
        bcrypt.compare(password, hash).then((resCompare) => {
          if (!resCompare) return helpers.response(res, null, 'password wrong !!', 404, null)
          const payload = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
          }

          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
            user.token = token

            delete user.password
            delete user.createdAt
            delete user.updatedAt

            if (user.roleId !== 1) {
              user.roleId = 'Guest User'
            } else {
              user.roleId = 'Admin'
            }

            helpers.response(res, null, user, 200)
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
