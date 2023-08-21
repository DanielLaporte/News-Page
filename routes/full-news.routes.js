const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/newsArticle'); // Ajusta la ruta al modelo

// Otras rutas y configuraciones...

router.get('newsarticles/:id', (req, res, next) => {
  const newsArticleId = req.params.id;
  
  NewsArticle.findById(newsArticleId)
    .populate('author')
    .exec((err, newsArticle) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/full-news', { newsArticle }); // Renderizar vista de noticia completa
    });
});

module.exports = router;

