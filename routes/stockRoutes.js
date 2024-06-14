const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.post("/create", stockController.createStock);
router.get("/", stockController.getAllStocks);
router.get("/:stockId", stockController.getStockById);
router.put("/:stockId", stockController.updateStock);
router.delete("/:stockId", stockController.deleteStock);

module.exports = router;
