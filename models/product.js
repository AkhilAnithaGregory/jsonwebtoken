const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  salePrice: { type: Number, required: true },
  discountPrice: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [String],
  sizes: [String],
  colors: [String],
  brandName: { type: String },
  reviews: [reviewSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date },
  isActive: { type: Boolean, default: true },
});

productSchema.virtual("categoryName").get(function () {
  return this.category.name;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
