const connection = require('../configs/db')

const histories = {
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product INNER JOIN category ON product.idCategory = category.id INNER JOIN history ON history.idproduct = product.id WHERE history.id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllhistory: (search, sort, order, page, limit, group) => {
    return new Promise((resolve, reject) => {
      let searchHistory = ''
      let sortHistory = ''
      let pageHistory = ''
      let groupHistory = ''
      let groupSql = ''
      const date = 'DATE_FORMAT(history.date, "%d %M %Y") AS "date"'
      const day = 'DATE_FORMAT(history.date, "%d") AS "day"'
      const month = 'DATE_FORMAT(history.date, "%m") AS "month"'
      const year = 'DATE_FORMAT(history.date, "%Y") AS "year"'

      if (search != null) {
        searchHistory = `WHERE product.name LIKE '%${search}%'`
      }
      if (group != null) {
        groupSql = ',SUM(product.price*history.countItem) AS "amount"'
        groupHistory = `GROUP BY ${group}`
      }
      if (sort != null) {
        if (order != null) {
          sortHistory = `ORDER BY history.${sort} ${order}`
        } else {
          sortHistory = `ORDER BY history.${sort} ASC`
        }
      } else {
        sortHistory = 'ORDER BY history.id ASC'
      }
      if (page != null) {
        if (limit != null) {
          pageHistory = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
        } else {
          pageHistory = `LIMIT 3 OFFSET ${(page - 1) * 3}`
        }
      }

      connection.query(`SELECT *, product.price*history.countItem AS 'Total', ${date}, ${day}, ${month}, ${year}, history.id AS 'id'${groupSql} FROM product INNER JOIN category ON product.idCategory = category.id INNER JOIN history ON history.idproduct = product.id INNER JOIN user ON user.id = history.idUser ${searchHistory} ${groupHistory} ${sortHistory} ${pageHistory}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateHistory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE history SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM history WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve('Delete History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertHistory: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO history SET ?', data, (err, result) => {
        if (!err) {
          resolve('Add History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = histories
