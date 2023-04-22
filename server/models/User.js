import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [6, 'Your password must be at least 6 characters'],
    select: false, // this will make sure that when we get a user response back that the password will not be included
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Need to export the model like this in Next JS
export default mongoose.models.User || mongoose.model('User', userSchema);
