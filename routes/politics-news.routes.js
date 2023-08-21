const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");


router.get('/politics', (req, res, next) => {
  NewsArticle.find({ section: 'Politics' })
    .populate('author') 
    .exec((err, politicsNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/politics-news', { newsArticles: politicsNews });
    });
});

module.exports = router;