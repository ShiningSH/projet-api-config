
const mongoose = require('mongoose');

const merchantPriceSchema = new mongoose.Schema({
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  componentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MerchantPrice', merchantPriceSchema);
