const Product = require("../models/product");
const Wishlist = require("../models/wishList");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      salePrice,
      discountPrice,
      category,
      images,
      reviews,
      createdBy,
      modifiedBy,
    } = req.body;

    if (!name || !salePrice || !category || !createdBy) {
      return res.status(400).json({
        status: "failed",
        error: "Name, salePrice, category, and createdBy are required fields",
      });
    }

    const newProduct = new Product({
      name,
      description,
      salePrice,
      discountPrice,
      category,
      images,
      reviews,
      createdOn: new Date(),
      createdBy,
      modifiedOn: new Date(),
      modifiedBy,
      isActive: true,
    });

    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const userId = null;
    const userWishlist = userId
      ? await Wishlist.findOne({ user: userId }).populate("products")
      : null;
    const wishlistProductIds = userWishlist
      ? userWishlist.products.map((product) => product._id.toString())
      : [];

    const products = await Product.find().populate(
      "createdBy modifiedBy category reviews.user"
    );
    const productsWithWishlistStatus = products.map((product) => {
      const isInWishlist = wishlistProductIds.includes(product._id.toString());
      return {
        ...product.toObject(),
        isInWishlist,
      };
    });

    res
      .status(200)
      .json({ status: "success", data: productsWithWishlistStatus });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "failed",
        error: "Product not found",
      });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, salePrice, category, images, reviews } =
      req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        status: "failed",
        error: "Product not found",
      });
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.salePrice = salePrice || existingProduct.salePrice;
    existingProduct.category = category || existingProduct.category;
    existingProduct.images = images || existingProduct.images;
    existingProduct.reviews = reviews || existingProduct.reviews;
    existingProduct.modifiedOn = new Date();
    existingProduct.modifiedBy = "admin";

    await existingProduct.save();

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: existingProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        status: "failed",
        error: "Product not found",
      });
    }
    await existingProduct.remove();

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
