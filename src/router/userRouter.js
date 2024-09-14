const userControler = require ('../controller/userController')
const express = require('express')

const router = express.Router()

router.get('/',userControler.userList)
router.post('/sign-up',userControler.signUp)
router.post('/loge-in',userControler.logeIn)


module.exports = router