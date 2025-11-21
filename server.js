import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { initDb, getDb } from './database/connect.js';
import userRoutes from './routes/userRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/', userRoutes);


initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });