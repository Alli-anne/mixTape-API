import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: [String],
        required: true
    },
    album: {
        type: String,
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    spotifyId: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    durationMs: {
        type: Number,
        required: false
    },
    previewUrl: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

songSchema.index({ spotifyId: 1 }, { unique: true, sparse: true });

songSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Song', songSchema);