import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('User', userSchema);