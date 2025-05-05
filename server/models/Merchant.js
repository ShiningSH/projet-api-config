// models/Merchant.js

import mongoose from 'mongoose';

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

// Exportation par défaut de notre modèle
export default mongoose.model('Merchant', merchantSchema);
