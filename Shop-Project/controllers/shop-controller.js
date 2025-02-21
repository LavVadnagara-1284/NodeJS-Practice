const ProductModel = require('../models/product-model');
const CartModel = require('../models/cart-model');

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

/*
Note:
-> This function handles GET requests to /products (From the browser). It retrieves all products from ProductModel.fetchAll(), once the data is fetched, it renders product-list.ejs, The retrieved products (prods) are sent to the view so they can be displayed on the page.
-> Calls ProductModel.fetchAll() to get all stored products. Passes the fetched data (products) to the product-list.ejs template. The template then loops through the products and displays them.
*/

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
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

/* 
Note: 
-> This function renders the homepage (index.ejs), also fetches all available products (just like getProducts). The homepage displays featured or all products.
-> Calls ProductModel.fetchAll() to retrieve all stored products. Passes prods (products array) to index.ejs. The view then dynamically displays the products.
*/

exports.getCart = (req, res, next) => {
    CartModel.getCart((cart) => {
        ProductModel.fetchAll((products) => {
            const cartProducts = [];
            for (let product of products) {
                const cardProductData = cart.products.find(prod => prod.id === product.id);
                if (cardProductData) {
                    cartProducts.push({ productData: product, qty: cardProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    ProductModel.findById(prodId, (product) => {
        CartModel.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.findById(prodId, (product) => {
        CartModel.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}