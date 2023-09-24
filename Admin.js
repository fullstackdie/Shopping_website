const path = require("path");
const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/Admin");

router.get("/add-product", adminController.getAddProduct);
router.get("/EditProduct/:productId", adminController.getEditProduct);

router.get("/products", adminController.getAdminProducts);

router.post("/add-product", adminController.postAddProduct);
router.post("/EditProduct", adminController.postEditProduct);
router.post("/DeleteProduct", adminController.deleteProduct);

module.exports = {
  routes: router,
};
