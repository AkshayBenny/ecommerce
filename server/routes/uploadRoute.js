import express from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${uuidv4()}${path.extname(
        file.originalname
      )}`
    )
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = fileTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    return cb(new Error('Images only!'))
  }
}

const upload = multer({
  dest: './public/uploads/',
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  const imagePath = req.file.path
  const pathArray = imagePath.split('/')
  //remove first two element of array
  pathArray.splice(0, 2)
  const newPath = pathArray.join('/')

  res.send(`/${newPath}`)
})

export default router
