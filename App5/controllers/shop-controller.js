const ProductModel = require('../models/product-model');

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getIndexPage = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Index-Shop',
            path: '/',
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}