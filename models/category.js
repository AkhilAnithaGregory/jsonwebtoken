// models/category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  createdOn: { type: Date, required: true },
  createdBy: { type: String, required: true },
  modifiedOn: { type: Date, required: true },
  modifiedBy: { type: String, required: true },
  isActive: { type: Boolean },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
