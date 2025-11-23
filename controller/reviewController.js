// controller/reviewController.js

import db from '../models/index.js';
const Review = db.review;

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE a review
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE a review
const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE a review
const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};