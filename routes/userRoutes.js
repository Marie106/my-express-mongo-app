const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

 // POST a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // PATCH a user
router.patch('/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // DELETE a user
router.delete('/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  module.exports = router;