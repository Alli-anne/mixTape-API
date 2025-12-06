import mongoose from 'mongoose';

const dailySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    song:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },
     createdAt: {
        type: Date,
        default: Date.now
    }
})

dailySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Daily', dailySchema);