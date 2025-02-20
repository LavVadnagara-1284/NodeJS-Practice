const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products-data.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) return cb([]);

        cb(JSON.parse(fileContent));
    })
}
/*
Note:
-> This function reads the product-data.json file asynchronously and if file does not exist or there is an error, it return an empty array, and if it is successful then it parses and returns the JSON data via a callback
-> It is used inside of the save() where it reads the product before adding a new one.
-> It is used also inside of the fetchAll() where it reads the product when listing them.
*/

module.exports = class ProductModel {
    constructor(id, titleProd, imageURL, description, price) {
        this.id = id;
        this.title = titleProd;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    /*
    Note: 
    This is the constructor that creates the new ProductModel instance with a title 't', and is used in admin-controller.js when a product is created => const product = new ProductModel(req.body.title)
    */

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const exisitingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[exisitingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }
    /* 
    Note: 
    It calls the getProductsFromFile() to fetch exisiting products, also it adds the new product (this) to the list, also it saves the updated list to the product-data.json. And is used in admin-controller.js when a product is submitted => product.save()
    */
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
    /* 
    Note: 
    It calls getProductsFromFile() to return all products, and is used in admin-controller.js when rendering products => ProductModel.fetchAll((products) => { ... })
    */

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product);
        });
    }
    /* 
    Note: 
    It calls getProductsFromFile() to find a product by its id, and is used in shop-controller.js when rendering a single product => ProductModel.findById(req.params.productId, (product) => {... })
    */
}