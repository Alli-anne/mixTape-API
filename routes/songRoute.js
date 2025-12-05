import express from 'express';
import {
  getAllSongs,
//   getSongById,
  createSong,
  updateSong,
  deleteSong,
  searchSpotifyController,
  getBySpotifyId
} from '../controller/songController.js';
import { requiresAuth } from '../middleware/auth.js';


const router = express.Router();
// Spotify search

router.get('/search/spotify', requiresAuth(),searchSpotifyController);


// Get song by Spotify ID
router.get('/spotify/:id', getBySpotifyId);

// Local DB routes
router.get('/', getAllSongs);
// router.get('/:id', getSongById);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);



export default router;