import { body } from 'express-validator';

const createDailyValidators = [
  body('user')
    .exists({ checkFalsy: true }).withMessage('user is required')
    .isMongoId().withMessage('user must be a valid Mongo ID'),

  body('song')
    .exists({ checkFalsy: true }).withMessage('song is required')
    .isMongoId().withMessage('song must be a valid Mongo ID')
];

export { createDailyValidators };
