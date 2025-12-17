// controller/songController.js

import db from '../models/index.js';
import { searchSongs, getSongById as fetchSongBySpotifyId } from '../spotify.service.js';

const Song = db.song;

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

/**
 * GET all songs
 */
const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  sendResponse(res, 200, true, songs);
});

/**
 * GET single song by local DB ID
 */
//const getSongById = asyncHandler(async (req, res) => {
  //const song = await Song.findById(req.params.id);
  //if (!song) return sendResponse(res, 404, false, 'Song not found', true);
  //sendResponse(res, 200, true, song);
//});

/**
 * CREATE a song
 */
const createSong = asyncHandler(async (req, res) => {
  const newSong = await Song.create(req.body);
  sendResponse(res, 201, true, newSong);
});

/**
 * UPDATE a song
 */
const updateSong = asyncHandler(async (req, res) => {
  const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSong) return sendResponse(res, 404, false, 'Song not found', true);
  sendResponse(res, 200, true, updatedSong);
});

/**
 * DELETE a song
 */
const deleteSong = asyncHandler(async (req, res) => {
  const deletedSong = await Song.findByIdAndDelete(req.params.id);
  if (!deletedSong) return sendResponse(res, 404, false, 'Song not found', true);
  sendResponse(res, 200, true, 'Song deleted');
});

/**
 * GET song from Spotify by Spotify ID
 */
const getBySpotifyId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) return sendResponse(res, 400, false, 'Spotify ID is required', true);

  const song = await fetchSongBySpotifyId(id);
  sendResponse(res, 200, true, song);
});

/**
 * SEARCH songs on Spotify
 */
const searchSpotifyController = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) return sendResponse(res, 400, false, 'Query is required', true);

  const results = await searchSongs(query);
  sendResponse(res, 200, true, results);
});

/**
 * ADD song from Spotify
 */
const addSongFromSpotify = asyncHandler(async (req, res) => {
  const { spotifyId } = req.body;
  
  if (!spotifyId) {
    return sendResponse(res, 400, false, 'Spotify ID is required', true);
  }

  // Check if song already exists in database
  const existingSong = await Song.findOne({ spotifyId });
  if (existingSong) {
    return sendResponse(res, 200, true, existingSong);
  }

  // Fetch song data from Spotify
  const spotifyData = await fetchSongBySpotifyId(spotifyId);
  
  if (!spotifyData) {
    return sendResponse(res, 404, false, 'Song not found on Spotify', true);
  }

  // Map Spotify data to your schema
  const songData = {
    title: spotifyData.name,
    artist: spotifyData.artists?.map(artist => artist.name) || [],
    album: spotifyData.album?.name,
    releaseDate: spotifyData.album?.release_date ? new Date(spotifyData.album.release_date) : undefined,
    spotifyId: spotifyData.id,
    durationMs: spotifyData.duration_ms,
    previewUrl: spotifyData.preview_url,
    imageUrl: spotifyData.album?.images?.[0]?.url
  };

  // Save to database
  const newSong = await Song.create(songData);
  sendResponse(res, 201, true, newSong);
});

export {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  getBySpotifyId,
  searchSpotifyController,
  addSongFromSpotify
};
