const userControler = require ('../controller/userController')
const express = require('express')
const multer  = require('multer')
const upload = multer()


const router = express.Router()

router.get('/',userControler.userList)
router.post('/sign-up', upload.none(),userControler.signUp)
router.post('/loge-in', upload.none(),userControler.logeIn)


module.exports = router