// models/companyModel.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const CompanyModal = mongoose.model('Company', companySchema);

module.exports = CompanyModal;
