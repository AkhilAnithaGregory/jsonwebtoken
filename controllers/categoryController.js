const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, createdBy, modifiedBy } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ status: "failed", error: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      description,
      image,
      createdOn: new Date(),
      createdBy,
      modifiedOn: new Date(),
      modifiedBy,
      isActive: true,
    });

    await newCategory.save();

    res.status(201).json({
      status: "success",
      message: "Category registered successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error registering Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;

    const existingCategory = await Category.findById(categoryId);
    console.log("existingCategory", categoryId);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ status: "failed", error: "Category not found" });
    }
    existingCategory.name = name;
    existingCategory.description = description;
    existingCategory.modifiedOn = new Date();
    existingCategory.modifiedBy = "admin";

    await existingCategory.save();

    res
      .status(200)
      .json({ status: "success", message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ status: "failed", error: "Category not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", error: "Category not found" });
    }

    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    console.error("Error getting Category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
