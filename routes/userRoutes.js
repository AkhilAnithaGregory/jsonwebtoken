const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/add-company/:userId", userController.companyRegister);
router.get("/profile", authenticate, userController.getUserProfile);
router.put("/profile", authenticate, userController.updateUserProfile);
router.get("/list", authenticate, userController.listUsers);
router.post('/shipping-address', authenticate, userController.addShippingAddress);
router.get('/shipping-address', authenticate, userController.getShippingAddresses);
router.put('/shipping-address/:addressId', authenticate, userController.updateShippingAddress);
router.delete('/shipping-address/:addressId', authenticate, userController.deleteShippingAddress);

module.exports = router;
