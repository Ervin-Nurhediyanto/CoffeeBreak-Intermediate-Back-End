const redis = require('redis')
const client = redis.createClient(6379)
const helper = require('../helpers/helpers')

module.exports = {
  cacheGetAllProduct: (req, res, next) => {
    client.get('getallproduct', (err, data) => {
      // console.log(data)
      if (err) throw err
      if (data !== null) {
        helper.renponse(res, null, JSON.parse(data), 200)
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
