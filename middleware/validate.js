import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formatted = errors.array().map(err => ({ param: err.param, msg: err.msg }));
  return res.status(400).json({ success: false, errors: formatted });
};

export default validate;
