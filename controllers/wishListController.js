const Wishlist = require("../models/wishList");

exports.addToWishlist = async (req, res) => {
  try {
    const userId = "65eb09fd0bde3d2b0523657c";
    const { productId } = req.body;
    let userWishlist = userId
      ? await Wishlist.findOne({ user: userId }).populate("products")
      : null;
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
