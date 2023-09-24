const path = require("path");
const express = require("express");
const ShopController = require("../Controllers/Shop");

const router = express.Router();

router.get("/", ShopController.getIndex);
router.get("/products", ShopController.getAllProducts);
router.get("/product/:productId", ShopController.getProductDetailsById);
router.get("/cart", ShopController.getCartItems);
router.post("/cart", ShopController.postCartItems);
router.post("/cart-delete-item", ShopController.removeFromCart);
router.get("/orders", ShopController.getOrders);
router.get("/checkout", ShopController.getCheckOut);
module.exports = router;
