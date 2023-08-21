const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/newsArticle'); 
router.get('/:id', (req, res, next) => {
  const newsArticleId = req.params.id;

  NewsArticle.findById(newsArticleId)
    .populate('/:id')
    .exec((err, newsArticle) => {
      if (err) {
        return next(err);
      }

      res.render('articles/full-news', { newsArticle }); // 
    });
});

module.exports = router;