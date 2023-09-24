const fs = require("fs");
const path = require("path");
const Cart = require("./Cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "Data",
  "products.json"
);
//helperFunction
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err || fileContent.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(Id, productName, imageUrl, price, description) {
    this.Id = Id;
    this.title = productName;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductsFromFile((products) => {
      if (this.Id) {
        const existingProductIndex = products.findIndex(
          (p) => p.Id === this.Id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.Id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    function prodById(products) {
      const product = products.find((p) => p.Id === id);
      cb(product);
    }
    getProductsFromFile(prodById);
  }
  static deleteProdById(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.Id === id);
      const updatedProducts = products.filter((p) => p.Id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          return;
        } else {
          Cart.deleteCartItems(id, product.price);
        }
      });
    });
  }
};
