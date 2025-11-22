// controller/songController.js

//const Song = require('../models/'); // adjust the path as needed

// GET all songs
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET a single song by ID
exports.getSongById = async (req, res) => {
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
exports.createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json({ success: true, data: newSong });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE a song
exports.updateSong = async (req, res) => {
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
exports.deleteSong = async (req, res) => {
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
