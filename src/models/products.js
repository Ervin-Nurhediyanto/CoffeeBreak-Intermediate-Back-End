const connection = require('../configs/db')
// const { promise } = require('../configs/db')

const products = {
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category INNER JOIN product ON product.idCategory = category.id WHERE product.id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllproduct: (search, sort, order, page, limit) => {
    return new Promise((resolve, reject) => {
      let searchProduct = ''
      let sortProduct = ''
      let pageProduct = ''

      if (search != null) {
        searchProduct = `WHERE product.name LIKE '%${search}%'`
      }
      if (sort != null) {
        if (order != null) {
          sortProduct = `ORDER BY ${sort} ${order}`
        } else {
          sortProduct = `ORDER BY ${sort} ASC`
        }
      }
      if (page != null) {
        if (limit != null) {
          pageProduct = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
        } else {
          pageProduct = `LIMIT 6 OFFSET ${(page - 1) * 6}`
        }
      }
      if (sort === 'new') {
        connection.query(`SELECT * FROM category INNER JOIN product ON product.idCategory = category.id INNER JOIN history ON history.idProduct = product.id ${searchProduct} ORDER BY date DESC ${pageProduct}`, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      } else {
        connection.query(`SELECT * FROM category INNER JOIN product ON product.idCategory = category.id ${searchProduct} ${sortProduct} ${pageProduct}`, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      }
    })
  },

  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertProduct: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = products
