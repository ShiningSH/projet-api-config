
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Merchant', merchantSchema);
