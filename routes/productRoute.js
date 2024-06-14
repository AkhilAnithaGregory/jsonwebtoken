const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/:productId", productController.getProductById);
router.post("/create", productController.createProduct);
router.put("/update/:productId", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);

router.post("/:productId/reviews", productController.addReview);
router.put("/:productId/reviews/:reviewId", productController.updateReview);
router.delete("/:productId/reviews/:reviewId", productController.deleteReview);

module.exports = router;
