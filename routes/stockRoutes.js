const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.post("/", authenticate, stockController.createStock);
router.get("/", authenticate, stockController.getAllStocks);
router.get("/:stockId", authenticate, stockController.getStockById);
router.put("/:stockId", authenticate, stockController.updateStock);
router.delete("/:stockId", authenticate, stockController.deleteStock);

module.exports = router;
