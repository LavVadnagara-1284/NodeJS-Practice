const ProductModel = require('../models/product-model');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new ProductModel(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('admin/product-list-admin', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/product-list-admin',
        });
    });
}