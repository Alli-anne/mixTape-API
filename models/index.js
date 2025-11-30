import config from '../database/config.js';
import mongoose from 'mongoose';
import song from './song.js';
import user from './user.js';
import review from './review.js';
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.user = user;
db.song = song;
db.review = review;

export default db;