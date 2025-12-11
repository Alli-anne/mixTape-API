import express from "express";
import axios from "axios";
import User from "../models/User.js";

const router = express.Router();

const GOOGLE_REDIRECT_URI = "http://localhost:3000/auth/google/callback";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Redirect user to Google login page
router.get("/google", (req, res) => {
  const redirectUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
      prompt: "consent",
    });

  res.redirect(redirectUrl);
});

// Google redirects back to the app
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange "code" for access token
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const { access_token } = tokenRes.data;

    // Get the user's Google profile
    const googleUser = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, name, email, picture } = googleUser.data;

    // SAVE OR FIND USER IN MONGODB
    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = await User.create({
        googleId: id,
        name,
        email,
        photo: picture,
      });
    }

    //store user session
    req.session.user = user;

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
});

export default router;
