const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

function upload (req, res, next) {
  const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 100000 },
    fileFilter: function (req, file, cb) {
      const extFile = path.extname(file.originalname)
      if (extFile !== '.jpg') {
        cb('jpg Only!', false)
      } else {
        cb(null, true)
      }
    }
  }).single('image')

  uploadFile(req, res, function (err) {
    if (err) {
      if (err == 'jpg Only!') {
        return helpers.response(res, null, { message: 'jpg Only!' }, 403, 'Forbidden')
      } else {
        return helpers.response(res, null, { message: 'File too large' }, 403, 'Forbidden')
      }
    } else {
      next()
    }
  })
}

module.exports = {
  upload
}
