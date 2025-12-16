import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    artists: {
      type: [String],
      required: true
    },
    album: String,
    releaseDate: Date,
    spotifyId: {
      type: String,
      unique: true,
      sparse: true
    },
    durationMs: Number,
    previewUrl: String,
    imageUrl: String
  },
  { timestamps: true }
);

songSchema.index({ spotifyId: 1 }, { unique: true, sparse: true });
songSchema.index({ title: 'text', artists: 'text' });

export default mongoose.model('Song', songSchema);

