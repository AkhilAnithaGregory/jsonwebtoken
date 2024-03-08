const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.createCategory);
router.put("/update/:categoryId", categoryController.updateCategory);
router.delete("/delete/:categoryId", categoryController.deleteCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);

module.exports = router;
