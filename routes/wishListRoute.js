const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishListController");

router.post("/add", wishListController.addToWishlist);

module.exports = router;
