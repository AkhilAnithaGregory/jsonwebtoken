const Cart = require("../models/cart");
const Product = require("../models/product");

exports.createCart = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", error: "Product not found" });
    }

    // Check if the user already has a cart
    let existingCart = await Cart.findOne({ user: userId });

    // If the user has a cart, check if the product is already in the cart
    if (existingCart) {
      const isProductInCart = existingCart.products.some((item) =>
        item.product.equals(productId)
      );

      if (isProductInCart) {
        return res.status(401).json({
          status: "failed",
          message: "Product already exists in the cart",
        });
      }

      // If the product is not in the cart, add it
      existingCart.products.push({ product: productId, quantity: 1 });
      await existingCart.save();

      return res.status(200).json({
        status: "success",
        message: "Product added to the existing cart",
        data: existingCart,
      });
    }

    // If the user does not have a cart, create a new one
    const newCart = new Cart({
      user: userId,
      products: [{ product: productId, quantity: 1 }],
    });
    await newCart.save();

    return res.status(201).json({
      status: "success",
      message: "Cart created successfully",
      data: newCart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const userCart = userId
      ? await Cart.findOne({ user: userId }).populate("products.product")
      : null;

    if (!userCart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not found" });
    }

    res.status(200).json({ status: "success", data: userCart });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", error: "Product not found" });
    }

    const userCart = userId ? await Cart.findOne({ user: userId }) : null;

    if (!userCart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not found" });
    }

    const existingProductIndex = userCart.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingProductIndex !== -1) {
      userCart.products[existingProductIndex].quantity += quantity || 1;

      userCart.total = userCart.products.reduce((total, item) => {
        const productPrice = product.discountPrice || product.price;
        return total + productPrice * item.quantity;
      }, 0);

      await userCart.save();

      res.status(200).json({
        status: "success",
        message: "Product added to cart successfully",
        data: userCart,
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Product not found in Cart",
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId } = req.params;
    const userCart = userId ? await Cart.findOne({ user: userId }) : null;

    if (!userCart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not found" });
    }

    userCart.products = userCart.products.filter(
      (item) => !item.product.equals(productId)
    );

    if (userCart.products.length === 0) {
      await Cart.deleteOne({ user: userId });
      return res.status(200).json({
        status: "success",
        message: "Cart removed successfully",
      });
    }

    const productPromises = userCart.products.map(async (item) => {
      const product = await Product.findById(item.product);
      const productPrice = product.discountPrice || product.price;
      return productPrice * item.quantity;
    });

    const prices = await Promise.all(productPromises);
    userCart.total = prices.reduce((total, price) => total + price, 0);

    await userCart.save();

    res.status(200).json({
      status: "success",
      message: "Product removed from cart successfully",
      data: userCart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const deletedCart = userId
      ? await Cart.findOneAndRemove({ user: userId })
      : null;

    if (!deletedCart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not found" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
