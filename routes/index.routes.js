const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle.model'); // Importa el modelo de noticias
const capitalize = require('../utils/capitalize');
const projectName = "News-Page";
/* GET home page */

router.get("/", (req, res, next) => {
  let isAdmin = false;
  if (req.session.currentUser && req.session.currentUser.role === "admin") {
    isAdmin = true;
  }

  NewsArticle.find()
    .then((newsArticles) => {
      res.render("index", { appTitle: capitalize(projectName), newsArticles, isAdmin });
    })
    .catch((error) => {
      // Manejo de errores
      next(error);
    });
});

module.exports = router;
