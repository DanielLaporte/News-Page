const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");


router.get('/economy', (req, res, next) => {
  NewsArticle.find({ section: 'Economy' })
    .populate('author') 
    .exec((err, economyNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/economy-news', { newsArticles: economyNews });
    });
});

module.exports = router;