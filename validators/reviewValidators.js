import { body, param } from 'express-validator';

const createReviewValidators = [
  body('songId')
    .exists({ checkFalsy: true }).withMessage('songId is required')
    .isString().withMessage('songId must be a Spotify ID string'), 
  body('userId')
    .optional()
    .isMongoId().withMessage('userId must be a valid Mongo ID'),

  body('rating')
    .exists({ checkFalsy: true }).withMessage('rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .isString().withMessage('comment must be a string')
    .trim()
];

const updateReviewValidators = [
  param('id')
    .isMongoId().withMessage('Invalid review id'),

  body('songId')
    .optional()
    .isString().withMessage('songId must be a Spotify ID string'),  // Changed

  body('userId')
    .optional()
    .isMongoId().withMessage('userId must be a valid Mongo ID'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .isString().withMessage('comment must be a string')
    .trim()
];

export { createReviewValidators, updateReviewValidators };
