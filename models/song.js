import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    
})

songSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Song', songSchema);