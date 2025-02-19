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

module.exports = class ProductModel {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}