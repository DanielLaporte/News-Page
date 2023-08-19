const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const Comment = require("../models/Comment.model");
const isAdmin = require("../middleware/isAdmin");

// Ruta para mostrar el formulario de publicación de noticias
router.get("/publish-news", isAdmin, (req, res) => {
    res.render("admin/publish-news");
  });
  
// Ruta para publicar una nueva noticia (requiere autenticación de administrador)
router.post("/publish-news", isAdmin, (req, res, next) => {
  const { title, content, section } = req.body;
  const author = req.session.currentUser._id;

  NewsArticle.create({
    title,
    content,
    author,
    section,
  })
    .then((newArticle) => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});

// Ruta para editar una noticia existente (requiere autenticación de administrador)
router.post("/edit-news/:id", isAdmin, (req, res, next) => {
  const { title, content, section } = req.body;
  const articleId = req.params.id;

  NewsArticle.findByIdAndUpdate(articleId, {
    title,
    content,
    section,
  })
    .then(() => {
      res.redirect(`/news/${articleId}`);
    })
    .catch((error) => {
      next(error);
    });
});

// Ruta para eliminar un comentario (requiere autenticación de administrador)
router.post("/delete-comment/:commentId", isAdmin, (req, res, next) => {
  const commentId = req.params.commentId;

  Comment.findByIdAndDelete(commentId)
    .then(() => {
      res.redirect("back");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;