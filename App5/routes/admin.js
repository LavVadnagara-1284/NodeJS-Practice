const path = require('path');

const express = require('express');

const productsController = require('../controllers/shop-controller')

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

router.get('/products')

module.exports = router;