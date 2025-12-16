import db from '../models/index.js';
const Daily = db.review;


/**
 * Async handler to wrap async routes and forward errors
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


const getAllDaily = asyncHandler(async (req, res) => {
  const daily = await Daily.find();
  sendResponse(res, 200, true, daily);
});

const createDaily = asyncHandler(async (req, res) => {
  const newDaily = await Daily.create(req.body);
  sendResponse(res, 201, true, newDaily);
});

const deleteDaily = asyncHandler(async (req, res) => {
  const deletedDaily = await Daily.findByIdAndDelete(req.params.id);
  if (!deletedDaily) return sendResponse(res, 404, false, 'Daily not found', true);
  sendResponse(res, 200, true, deletedDaily);
});

export { getAllDaily, createDaily, deleteDaily };
