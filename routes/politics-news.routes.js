const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar las noticias internacionales
router.get('/politics', (req, res, next) => {
  NewsArticle.find({ section: 'Politics' })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, politicsNews) => {
      if (err) {
        return next(err);
      }
      
      res.render('articles/politics-news', { newsArticles: politicsNews });
    });
});

module.exports = router;