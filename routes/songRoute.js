import express from 'express';
import {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  searchSpotifyController,
  getBySpotifyId
} from '../controller/songController.js';
import { requiresAuth } from '../middleware/auth.js';

const router = express.Router();

// Spotify search
router.get('/search/spotify', requiresAuth(), searchSpotifyController);

// Get song by Spotify ID
router.get('/spotify/:id', requiresAuth(), getBySpotifyId);

// // Local DB routes
router.get('/', requiresAuth(), getAllSongs);
router.post('/', requiresAuth(), createSong);
router.put('/:id', requiresAuth(), updateSong);
router.delete('/:id', requiresAuth(), deleteSong);

export default router;