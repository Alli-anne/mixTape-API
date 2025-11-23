// controller/songController.js

import db from '../models/index.js';
const Song = db.song;

// GET all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET a single song by ID
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE a song
const createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json({ success: true, data: newSong });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE a song
const updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    res.status(200).json({ success: true, data: updatedSong });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE a song
const deleteSong = async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    res.status(200).json({ success: true, message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
}