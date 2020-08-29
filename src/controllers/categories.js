const categoryModels = require('../models/categories')
const helpers = require('../helpers/helpers')
const redis = require('redis')
// const client = redis.createClient(6379)

const categories = {
  getCategoryById: (req, res) => {
    const id = req.params.id
    categoryModels.getCategoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Kategori tidak ditemukan', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getAllcategory: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const order = req.query.order
    const page = req.query.page
    const limit = req.query.limit

    categoryModels.getAllcategory(search, sort, order, page, limit)
      .then((result) => {
        if (result != '') {
          // client.setex('getallcategory', 60 * 60 * 12, JSON.stringify(result))
          helpers.response(res, page, result, 200, null)
        } else {
          helpers.response(res, null, 'Kategori tidak ditemukan', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateCategory: (req, res) => {
    const id = req.params.id
    const { nameCategory } = req.body
    const data = {
      nameCategory
    }
    categoryModels.updateCategory(id, data)
      .then((result) => {
        const resultCategories = result
        console.log(result)
        helpers.response(res, null, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteCategory: (req, res) => {
    const id = req.params.id
    categoryModels.deleteCategory(id)
      .then((result) => {
        if (result == 'ID Category Sudah Digunakan') {
          helpers.response(res, null, result, 403, 'Forbidden')
        } else if (result == 'ID Category tidak ditemukan') {
          helpers.response(res, null, result, 404, 'Not Found')
        } else {
          helpers.response(res, null, result, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertCategory: (req, res) => {
    const { nameCategory } = req.body
    const data = {
      nameCategory
    }
    categoryModels.insertCategory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = categories
