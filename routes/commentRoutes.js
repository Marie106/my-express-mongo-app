const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// GET all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find().populate('post author');
  res.json(comments);
});

// POST a new comment
router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PATCH a comment
router.patch('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
