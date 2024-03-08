const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  salePrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [{ type: String }],
  reviews: [
    {
      user: { type: String },
      text: { type: String },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  createdOn: { type: Date, required: true },
  createdBy: { type: String, required: true },
  modifiedOn: { type: Date, required: true },
  modifiedBy: { type: String, required: true },
  isActive: { type: Boolean },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
