import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    reference: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Need to export the model like this in Next JS
export default mongoose.models.Address ||
  mongoose.model('Address', addressSchema);
