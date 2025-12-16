const express = require("express");
const router = express.Router();
const Mixtape = require("../models/Mixtape");

// GET all mixtapes
router.get("/", async (req, res, next) => {
  try {
    const mixtapes = await Mixtape.find();

    if (!mixtapes.length) {
      return res.status(404).json({
        error: true,
        message: "No mixtapes found"
      });
    }

    res.json(mixtapes);
  } catch (err) {
    next(err);
  }
});

// GET one mixtape by ID
router.get("/:id", async (req, res, next) => {
  try {
    const mixtape = await Mixtape.findById(req.params.id);

    if (!mixtape) {
      return res.status(404).json({
        error: true,
        message: "Mixtape not found"
      });
    }

    res.json(mixtape);
  } catch (err) {
    err.status = 400;
    err.message = "Invalid mixtape ID";
    next(err);
  }
});

// CREATE mixtape
router.post("/", async (req, res, next) => {
  try {
    const mixtape = new Mixtape(req.body);
    const saved = await mixtape.save();
    res.status(201).json(saved);
  } catch (err) {
    err.status = 400;
    err.message = "Invalid mixtape data";
    next(err);
  }
});

module.exports = router;