// const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin-controller')
/* 
Note: 
-> This imports the logic from the controllers folder / admin-controller.js 
-> This file contains the logic for handling admin related requests.
*/

const router = express.Router();
/* 
Note: 
Instead of app.use(), this file uses express.Router() to define routes 
*/

router.get('/add-product', adminController.getAddProduct);
/* 
Note: 
this is to GET /admin/add-product (in this browser) and calls the adminController.getAddProduct which renders the form for adding a product
*/

router.get('/products', adminController.getProducts);
/* 
Note: 
this is to GET /admin/products (in this browser) and calls the adminController.getProducts which retrives and displays the list of products for admin
*/

router.post('/add-product', adminController.postAddProduct);
/* 
Note: 
this is to POST /admin/add-product (in this browser) and calls the adminController.postAddProduct which saves the product and processes the form submission
*/

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;