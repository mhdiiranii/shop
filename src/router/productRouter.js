const productControler = require ('../controller/productController')
const express = require('express')


const router = express.Router()

router.get('/product',productControler.productList)
router.get('/product/filter',productControler.filterList)
router.get('/product/:id',productControler.oneProduct)

module.exports = router