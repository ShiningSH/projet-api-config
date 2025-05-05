import mongoose from 'mongoose';

const configurationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Configuration = mongoose.model('Configuration', configurationSchema);

export default Configuration;  // Utilisation de l'export par défaut
