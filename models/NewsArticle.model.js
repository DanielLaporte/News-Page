const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsArticleSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  section: String, // "politics", "sports", "culture", "economy", "science", "health", etc.
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;