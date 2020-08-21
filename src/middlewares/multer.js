const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const checkFileType = (file, cb) => {
  const fileType = /jpeg|jpg|png|gif/
  const extname = fileType.test(path.extname(file.originalname).toLowerCase)
  const mimetype = fileType.test(file.mimetype)

  if (mimetype && extname) {
    cb(null, true)
  } else {
    console.log(storage.filename)
    cb(`Error: Image Only!`)
  }
}

const upload = multer({
  storage: storage
  // limits: { fileSize: 1000000 },
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb)
  // }
}).single('image')
// console.log(storage)

module.exports = {
  upload
}
