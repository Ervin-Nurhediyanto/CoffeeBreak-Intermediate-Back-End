const historyModels = require('../models/histories')
const helpers = require('../helpers/helpers')
const redis = require('redis')
// const client = redis.createClient(6379)

const histories = {
  getHistoryById: (req, res) => {
    const id = req.params.id
    historyModels.getHistoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Pencarian tidak ditemukan', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getAllhistory: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const order = req.query.order
    const page = req.query.page
    const limit = req.query.limit
    const group = req.query.group

    historyModels.getAllhistory(search, sort, order, page, limit, group)
      .then((result) => {
        if (result != '') {
          // delete result.createdAt
          // delete result.updatedAt
          // delete result.password
          // client.setex('getallhistory', 60 * 60 * 12, JSON.stringify(result))
          helpers.response(res, page, result, 200, null)
        } else {
          helpers.response(res, null, 'Pencarian tidak ditemukan', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateHistory: (req, res) => {
    const id = req.params.id
    const { idProduct, countItem } = req.body
    const data = {
      idProduct,
      countItem
      // date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0]
    }
    historyModels.updateHistory(id, data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteHistory: (req, res) => {
    const id = req.params.id
    historyModels.deleteHistory(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const { idProduct, countItem } = req.body
    const data = {
      idProduct,
      countItem
    }
    historyModels.insertHistory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = histories
