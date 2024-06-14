const Wishlist = require("../models/wishList");

exports.addToWishlist = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId } = req.body;
    let userWishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );
    if (!userWishlist) {
      userWishlist = new Wishlist({ user: userId, products: [] });
    }
    if (userWishlist.products.includes(productId)) {
      return res
        .status(400)
        .json({ status: "failed", error: "Product already in wishlist" });
    }
    userWishlist.products.push(productId);
    await userWishlist.save();

    res.status(201).json({
      status: "success",
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const userWishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );
    if (!userWishlist) {
      return res
        .status(404)
        .json({ status: "failed", error: "Wishlist not found" });
    }
    res.status(200).json({ status: "success", wishlist: userWishlist });
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId } = req.body;
    let userWishlist = await Wishlist.findOne({ user: userId });
    if (!userWishlist) {
      return res
        .status(404)
        .json({ status: "failed", error: "Wishlist not found" });
    }
    const productIndex = userWishlist.products.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({ status: "failed", error: "Product not in wishlist" });
    }
    userWishlist.products.splice(productIndex, 1);
    await userWishlist.save();

    res.status(200).json({
      status: "success",
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    let userWishlist = await Wishlist.findOne({ user: userId });
    if (!userWishlist) {
      return res
        .status(404)
        .json({ status: "failed", error: "Wishlist not found" });
    }
    userWishlist.products = [];
    await userWishlist.save();

    res
      .status(200)
      .json({ status: "success", message: "Wishlist cleared successfully" });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
