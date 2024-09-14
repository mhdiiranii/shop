const userControler = require ('../controller/userController')
const express = require('express')


const router = express.Router()

router.get('/product',userControler.productList)

module.exports = router