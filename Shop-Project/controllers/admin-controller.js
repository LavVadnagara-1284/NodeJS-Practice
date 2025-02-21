const ProductModel = require('../models/product-model');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};
/* 
Note: 
-> This function renders the "Add Product" page from views (folder) > admin (folder) > add-product.ejs, this is done from the line (res.render('admin/add-product)) 
-> this is called from routes (folder) > admin.js => router.get('/add-product', adminController.getAddProduct), when users visits /admin/add-product this function loads the form
*/

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new ProductModel(null, title, imageURL, price, description);
    product.save();
    res.redirect('/');
};
/*
Note: 
-> This function reads the product title from the req.body.title (submitted form data), also creates a new ProductModel object, which is then called from the product.save() to store the product. Also this redirect the user to the '/' (home page) after saving
-> this is called from the routes (folder) > admin.js => router.post('/add-product', adminController.postAddProduct), when a user submits the form, this function saves the product and redirects to the homepage
*/

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    ProductModel.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new ProductModel(prodId, updatedTitle, updatedImageURL, updatedPrice, updatedDescription)
    updatedProduct.save();
    res.redirect('/admin/products');
    
}

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('admin/product-list-admin', {
            prods: products,
            pageTitle: 'Admin Products',
            // path: '/admin/product-list-admin',
            path: '/admin/products',
        });
    });
}
/*
Note: 
-> This function calls the ProductModel.fetchAll(callback), which retrieves all the products, Also this will render the views (folder) > admin (folder) > product-list-admin.ejs, by passing the prods: which is this list of products, pageTitle: which is this title of the page, path: which is the browser path to the /admin/product-list-admin
-> this is called from the routes (folder) > admin.js => router.get('/products', adminController.getProducts), when a user visits /admin/products, this function fetches all products and displays them in an admin product list.
*/

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.deleteById(prodId);
    res.redirect('/admin/products');
}