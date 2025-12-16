import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  }
}, { timestamps: true });


reviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Review', reviewSchema);