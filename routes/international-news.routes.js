const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");


router.get('/international', (req, res, next) => {
  NewsArticle.find({ section: 'International' })
    .populate('author') 
    .exec((err, internationalNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/international-news', { newsArticles: internationalNews });
    });
});

module.exports = router;