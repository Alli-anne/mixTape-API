import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL

export default { url: mongoUrl };