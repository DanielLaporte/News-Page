const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar las noticias internacionales
router.get('/health', (req, res, next) => {
  NewsArticle.find({ section: 'Health' })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, healthNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/health-news', { newsArticles: healthNews });
    });
});

module.exports = router;