const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 70000 },
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb)
  // }

  fileFilter: function (req, file, cb) {
    var extFile = path.extname(file.originalname)
    if (extFile !== '.jpg') {
      // skip uploadnya
      // inst(null, false)
      cb('jpg Only!', false)
    } else {
      cb(null, true)
    }
  }

}).single('image')
// console.log(storage)

// const checkFileType = (file, cb) => {
//   const fileType = /jpeg|jpg|png|gif/
//   const extname = fileType.test(path.extname(file.originalname).toLowerCase)
//   const mimetype = fileType.test(file.mimetype)

//   if (mimetype && extname) {
//     cb(null, true)
//   } else {
//     console.log(storage.filename)
//     cb('Error: Image Only!')
//   }
// }

module.exports = {
  upload
}
