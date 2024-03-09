const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/create", cartController.createCart);
router.post("/addToCart", cartController.addToCart);
router.post("/remove/:productId", cartController.removeFromCart);
router.post("/clear", cartController.clearCart);

module.exports = router;
