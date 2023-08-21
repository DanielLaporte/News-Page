const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");


router.get('/science', (req, res, next) => {
  NewsArticle.find({ section: 'Science' })
    .populate('author') 
    .exec((err, scienceNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/science-news', { newsArticles: scienceNews });
    });
});

module.exports = router;