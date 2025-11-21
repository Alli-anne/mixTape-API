import { getDb } from '../database/connect.js';
import { ObjectId } from 'mongodb';

export const getAllUsers = async (req, res) => {
  const db = getDb();
  const users = await db.collection('user').find({}).toArray();
  res.json(users);
};
