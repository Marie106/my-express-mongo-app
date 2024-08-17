const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

postSchema.index({ title: 1 }); // Index on title

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
