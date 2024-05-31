const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishListController");

router.post("/add", wishListController.addToWishlist);
router.get("/", wishListController.getWishlist);
router.post("/remove", wishListController.removeFromWishlist);
router.post("/clear", wishListController.clearWishlist);

module.exports = router;
