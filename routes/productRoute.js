const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/:productId", productController.getProductById);
router.post("/create", productController.createProduct);
router.put("/update", productController.updateProduct);
router.delete("/delete", productController.deleteProduct);

router.post("/:productId/reviews", authenticate, productController.addReview);
router.put("/:productId/reviews/:reviewId",authenticate,productController.updateReview);
router.delete("/:productId/reviews/:reviewId",authenticate,productController.deleteReview);

module.exports = router;
