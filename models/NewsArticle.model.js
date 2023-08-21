const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  section: { type: String, required: true }, 
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;