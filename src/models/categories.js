const connection = require('../configs/db')
// const { promise } = require('../configs/db')

const categories = {
  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllcategory: (search, sort, order, page, limit) => {
    let searchCategory = ''
    let sortCategory = ''
    let pageCategory = ''

    if (search != null) {
      searchCategory = `WHERE category.nameCategory LIKE '%${search}%'`
    }
    if (sort != null) {
      if (order != null) {
        sortCategory = `ORDER BY ${sort} ${order}`
      } else {
        sortCategory = `ORDER BY ${sort} ASC`
      }
    }
    if (page != null) {
      if (limit != null) {
        pageCategory = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
      } else {
        pageCategory = `LIMIT 3 OFFSET ${(page - 1) * 3}`
      }
    }
    return new Promise((resolve, reject) => {
      if (search != null || sort != null || page != null) {
        connection.query(`SELECT * FROM product INNER JOIN category ON product.idCategory = category.id ${searchCategory} ${sortCategory} ${pageCategory}`, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      } else {
        connection.query('SELECT * FROM category', (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      }
    })
  },
  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertCategory: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO category SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = categories
