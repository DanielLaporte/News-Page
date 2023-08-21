const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar las noticias internacionales
router.get('/sports', (req, res, next) => {
  NewsArticle.find({ section: 'Sports' })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, sportsNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/sports-news', { newsArticles: sportsNews });
    });
});

module.exports = router;