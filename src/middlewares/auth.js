const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')

module.exports = {
  verifyAccess: (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) return helpers.response(res, null, { message: 'token invalid' }, 403)
      next()
    })
  },

  verifyAccessAdmin: (req, res, next) => {
    let token = req.headers.authorization
    const tokenArr = token.split(' ')
    token = tokenArr[1]
    const roleId = tokenArr[2]

    if (roleId == 1) {
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) return helpers.response(res, null, { message: 'token invalid' }, 403)

        next()
      })
    } else {
      return helpers.response(res, null, { message: 'u are not admin' }, 403)
    }
  }
}
