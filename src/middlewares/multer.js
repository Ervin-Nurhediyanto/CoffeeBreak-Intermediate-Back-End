const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
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

module.exports = {
  upload
}
