// controller/reviewController.js

import db from '../models/index.js';
import { getSongById } from '../spotify.service.js';
const Review = db.review;

/**
 * Helper to handle async controllers and errors
 */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Standard response helper
 */
const sendResponse = (res, status, success, dataOrMessage, isError = false) => {
  if (isError) {
    res.status(status).json({ success, message: dataOrMessage });
  } else {
    res.status(status).json({ success, data: dataOrMessage });
  }
};

// GET all reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  sendResponse(res, 200, true, reviews);
});

// GET single review by ID
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return sendResponse(res, 404, false, 'Review not found', true);
  sendResponse(res, 200, true, review);
});

// CREATE a review
const createReview = asyncHandler(async (req, res) => {
  const { songId: spotifyId, rating, comment, hashtags } = req.body;

  if (!spotifyId) {
    return res.status(400).json({ success: false, message: 'Spotify songId is required' });
  }

  // 1️⃣ Find the song in DB
  let song = await Song.findOne({ spotifyId });

  // 2️⃣ If not found, fetch from Spotify API
  if (!song) {
    const track = await getSongById(spotifyId);
    if (!track) {
      return res.status(404).json({ success: false, message: 'Song not found in Spotify' });
    }

    // Save trimmed song data to DB
    song = await Song.create({
      spotifyId: track.id,
      title: track.name,
      artists: track.artists.map(a => a.name),
      album: track.album.name,
      releaseDate: track.album.release_date,
      durationMs: track.duration_ms,
      previewUrl: track.preview_url,
      imageUrl: track.album.images[0]?.url
    });
  }

  // 3️⃣ Optional: prevent duplicate review by the same user
  const existingReview = await Review.findOne({
    songId: song._id,
    userId: req.user._id
  });
  if (existingReview) {
    return res.status(400).json({ success: false, message: 'You have already reviewed this song' });
  }

  // 4️⃣ Create the review using Mongo ObjectId
  const newReview = await Review.create({
    songId: song._id,
    userId: req.user._id,
    rating,
    comment,
    hashtags // make sure hashtags is an array if your schema expects it
  });

  return res.status(201).json({ success: true, data: newReview });
});

// UPDATE a review
const updateReview = asyncHandler(async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedReview) return sendResponse(res, 404, false, 'Review not found', true);
  sendResponse(res, 200, true, updatedReview);
});

// DELETE a review
const deleteReview = asyncHandler(async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);
  if (!deletedReview) return sendResponse(res, 404, false, 'Review not found', true);
  sendResponse(res, 200, true, 'Review deleted');
});

export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
