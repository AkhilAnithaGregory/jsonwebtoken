const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/create", cartController.createCart);
router.post("/addToCart", cartController.addToCart);

module.exports = router;
