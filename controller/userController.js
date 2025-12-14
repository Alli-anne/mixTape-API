// controller/userController.js

import db from '../models/index.js';
const User = db.user;

/**
 * Async handler to catch errors
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

/**
 * CREATE a new user
 */
// const createUser = asyncHandler(async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return sendResponse(res, 400, false, 'Username and password are required', true);
//   }

//   const user = new User({ username, password });
//   const savedUser = await user.save();

//   sendResponse(res, 201, true, savedUser);
// });

/**
 * GET all users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  sendResponse(res, 200, true, users);
});

export { 
  // createUser, 
  getAllUsers };