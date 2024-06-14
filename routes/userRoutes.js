const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/add-company/:userId", userController.companyRegister);
router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);
router.get("/list", userController.listUsers);
router.post("/shipping-address", userController.addShippingAddress);
router.get("/shipping-address", userController.getShippingAddresses);
router.put("/shipping-address/:addressId",userController.updateShippingAddress);
router.delete("/shipping-address/:addressId",userController.deleteShippingAddress);

module.exports = router;
