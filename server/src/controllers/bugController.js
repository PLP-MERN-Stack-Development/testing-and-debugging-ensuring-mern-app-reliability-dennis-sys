const Bug = require('../models/Bug');

// Get all bugs
const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

// Create bug
const createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const bug = new Bug({ title, description });
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

// Update bug
const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// Delete bug
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBugs, createBug, updateBug, deleteBug };
