// controller/reviewController.js

import db from '../models/index.js';
import fetchSpotifyTrack from '../utils/spotify.js';
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
  const newReview = await Review.create(req.body);
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
