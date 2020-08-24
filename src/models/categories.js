const connection = require('../configs/db')

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
        pageCategory = `LIMIT 6 OFFSET ${(page - 1) * 6}`
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
          resolve('Update Category Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product INNER JOIN category ON product.idCategory = category.id WHERE category.id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            resolve('ID Category Sudah Digunakan')
          } else {
            connection.query('DELETE FROM category WHERE id = ?', id, (err, result) => {
              if (!err) {
                if (result.affectedRows != 0) {
                  resolve('Delete Category Success')
                } else {
                  resolve('ID Category tidak ditemukan')
                }
              } else {
                reject(new Error(err))
              }
            })
          }
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
          resolve('Add Category Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = categories
