import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { initDb, getDb } from './database/connect.js';
import userRoutes from './routes/userRoute.js';
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const requiresAuth = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.oidc.login({ returnTo: req.originalUrl });
  }
  next();
}


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