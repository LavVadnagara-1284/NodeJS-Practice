const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart-data.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            // if (!err) {
            //     cart = JSON.parse(fileContent);
            // }
            if (!err && fileContent.length > 0) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (error) {
                    console.log("Error parsing cart JSON:", error);
                    cart = { products: [], totalPrice: 0 }; // Reset cart if JSON is corrupted
                }
            }

            // Ensure cart.products is always an array
            if (!Array.isArray(cart.products)) {
                cart.products = [];
            }
            // Ensure totalPrice is a valid number
            if (typeof cart.totalPrice !== "number" || isNaN(cart.totalPrice)) {
                cart.totalPrice = 0;
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
                // cart.totalPrice += productPrice;
            } else {
                updatedProduct = {
                    id,
                    qty: 1,
                    price: productPrice,
                };
                cart.products = [...cart.products, updatedProduct];
                // cart.totalPrice += productPrice;
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    };

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        })
    };

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};