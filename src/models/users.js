const connection = require('../configs/db')

module.exports = {
  login: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', data.email, (err, result) => {
        if (!err) {
          if (result != '') {
            resolve('email sudah terdaftar')
          } else {
            connection.query('INSERT IGNORE INTO user SET ?', data, (err, result) => {
              if (!err) {
                resolve(result)
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
  }
}
