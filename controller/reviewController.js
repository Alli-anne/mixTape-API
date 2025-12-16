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
  const track = await getSongById(spotifyId);

  const { songId: spotifyId, rating, comment, hashtags } = req.body;

  let song = await Song.findOne({ spotifyId });
  if (!song) {
    
    const track = await fetchSpotifyTrack(spotifyId); 
    if (!track) return sendResponse(res, 404, false, 'Song not found in Spotify', true);

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


  const newReview = await Review.create({
    songId: song._id,
    userId: req.user._id, 
    rating,
    comment,
    hashtags
  });

  sendResponse(res, 201, true, newReview);
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
