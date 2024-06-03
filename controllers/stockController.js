const Stock = require('../models/stock');

exports.createStock = async (req, res) => {
  try {
    const { name, image, quantity, pricePerUnit } = req.body;
    const totalAmount = quantity * pricePerUnit;
    const userId = req.user._id;

    const newStock = new Stock({ name, image, quantity, pricePerUnit, totalAmount, user: userId });
    await newStock.save();

    res.status(201).json({ status: 'success', data: newStock });
  } catch (error) {
    console.error('Error creating stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllStocks = async (req, res) => {
  try {
    const userId = req.user._id;
    const stocks = await Stock.find({ user: userId });

    res.status(200).json({ status: 'success', data: stocks });
  } catch (error) {
    console.error('Error getting stocks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const userId = req.user._id;
    const stock = await Stock.findOne({ _id: stockId, user: userId });

    if (!stock) {
      return res.status(404).json({ status: 'failed', error: 'Stock not found' });
    }

    res.status(200).json({ status: 'success', data: stock });
  } catch (error) {
    console.error('Error getting stock by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const userId = req.user._id;
    const updates = req.body;

    const stock = await Stock.findOneAndUpdate({ _id: stockId, user: userId }, updates, { new: true, runValidators: true });
    if (!stock) {
      return res.status(404).json({ status: 'failed', error: 'Stock not found' });
    }

    stock.totalAmount = stock.quantity * stock.pricePerUnit;
    await stock.save();

    res.status(200).json({ status: 'success', data: stock });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const userId = req.user._id;

    const stock = await Stock.findOneAndDelete({ _id: stockId, user: userId });
    if (!stock) {
      return res.status(404).json({ status: 'failed', error: 'Stock not found' });
    }

    res.status(200).json({ status: 'success', message: 'Stock deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
