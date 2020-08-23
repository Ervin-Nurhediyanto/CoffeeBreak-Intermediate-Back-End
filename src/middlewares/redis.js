const redis = require('redis')
const client = redis.createClient(6379)
const helpers = require('../helpers/helpers')

module.exports = {
  cacheGetAllProduct: (req, res, next) => {
    client.get('getallproduct', (err, data) => {
      if (err) throw err
      if (data !== null) {
        helpers.response(res, null, JSON.parse(data), 200)
      } else {
        next()
      }
    })
  },
  clearGetAllProduct: (req, res, next) => {
    client.del('getallproduct')
    next()
  }
}
