import { body } from 'express-validator';

const createDailyValidators = [
  body('user')
    .exists({ checkFalsy: true }).withMessage('user is required')
    .isMongoId().withMessage('user must be a valid Mongo ID'),

  body('song')
    .exists({ checkFalsy: true }).withMessage('spotifyId is required')
    .isString().withMessage('spotifyId must be a string')
];

export { createDailyValidators };
