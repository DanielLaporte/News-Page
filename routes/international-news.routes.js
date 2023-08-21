const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar las noticias internacionales
router.get('/international', (req, res, next) => {
  NewsArticle.find({ section: 'International' })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, internationalNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/international-news', { newsArticles: internationalNews });
    });
});

module.exports = router;