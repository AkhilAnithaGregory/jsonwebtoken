const Cart = require("../models/cart");
const Product = require("../models/product");

exports.createCart = async (req, res) => {
  try {
    // const userId = req.user ? req.user._id : null;
    const userId = "65eb09f10bde3d2b05236579";
    const { productId } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", error: "Product not found" });
    }

    // Check if the user already has a cart
    const existingCart = await Cart.findOne({ user: userId });

    // Check if the same product is already in the cart
    if (
      existingCart &&
      existingCart.products.some((item) => item.product.equals(productId))
    ) {
      return res
        .status(400)
        .json({ status: "failed", error: "Product already in the cart" });
    }

    const newCart = new Cart({
      user: userId,
      products: [
        {
          product: productId,
          quantity: 1, 
        },
      ],
    });

    await newCart.save();

    res.status(201).json({
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
    const userId = "65eb09f10bde3d2b05236579";
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
    } else {
      const defaultQuantity = quantity || 1;
      userCart.products.push({ product: productId, quantity: defaultQuantity });
    }

    userCart.total = userCart.products.reduce((total, item) => {
      const productPrice = product.salePrice || product.price;
      return total + productPrice * item.quantity;
    }, 0);

    await userCart.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      data: userCart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
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
    userCart.total = userCart.products.reduce((total, item) => {
      const productPrice = item.product.salePrice || item.product.price;
      return total + productPrice * item.quantity;
    }, 0);

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
