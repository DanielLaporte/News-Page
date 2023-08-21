const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar las noticias internacionales
router.get('/economy', (req, res, next) => {
  NewsArticle.find({ section: 'Economy' })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, economyNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/economy-news', { newsArticles: economyNews });
    });
});

module.exports = router;