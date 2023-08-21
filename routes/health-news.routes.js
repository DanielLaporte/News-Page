const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");


router.get('/health', (req, res, next) => {
  NewsArticle.find({ section: 'Health' })
    .populate('author') 
    .exec((err, healthNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/health-news', { newsArticles: healthNews });
    });
});

module.exports = router;