import dotenv from 'dotenv';
import pkg from 'express-openid-connect';

const { auth, requiresAuth } = pkg;
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const authMiddleware = auth(config);

const requiresAuthRedirect = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

export {authMiddleware, requiresAuth, requiresAuthRedirect, config};
export default authMiddleware;