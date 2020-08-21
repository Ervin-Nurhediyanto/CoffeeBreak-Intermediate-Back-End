const multer = require('multer')

// module.exports = {
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname + new Date())
//     }
//   }),
//   upload: multer({ storage: storage })
// }
// module.exports = {
//   upload
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + new Date())
  }
})

const upload = multer({ storage: storage })

module.exports = {
  upload
}
