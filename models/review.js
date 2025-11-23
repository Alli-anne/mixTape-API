import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    
})

reviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Review', reviewSchema);