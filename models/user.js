import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false, unique: true, sparse: true },
  email: { type: String, required: false },
  name: { type: String, required: false },
  photo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// This prevents OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
