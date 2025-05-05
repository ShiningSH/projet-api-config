import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  categoryId: {
    type: String, // ⬅️ Corrigé ici pour correspondre à "cat1", "cat2", etc.
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  specs: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const Component = mongoose.model('Component', componentSchema);

export default Component;
