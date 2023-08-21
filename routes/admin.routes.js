const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const Comment = require("../models/Comment.model");
const isAdmin = require("../middleware/isAdmin");
const multer = require('multer');

// Ruta para mostrar el formulario de publicación de noticias
router.get("/publish-news", isAdmin, (req, res) => {
    res.render("admin/publish-news");
  });
  
// Ruta para publicar una nueva noticia (requiere autenticación de administrador)
router.post("/publish-news", isAdmin, (req, res, next) => {
  const { title, content, section, } = req.body;
  const author = req.session.currentUser.username;

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
router.get("/edit-news", isAdmin, (req, res, next) => {
  NewsArticle.find()
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, newsArticles) => {
      if (err) {
        return next(err);
      }
      
      res.render("admin/edit-news", { newsArticles }); // Pasar los datos poblados a la vista
    });
});

router.post("/edit-news/:id/update", isAdmin, (req, res, next) => {
  const { id } = req.params;
  const { title, content, section, author } = req.body;

  NewsArticle.findByIdAndUpdate(id, { title, content, section, author }, { new: true })
    .populate('author') // Poblar el campo 'author' con los datos de usuario
    .exec((err, updatedNewsArticle) => {
      if (err) {
        return next(err);
      }
      
      res.render("admin/edit-news", { newsArticle: updatedNewsArticle }); // Pasar el dato actualizado a la vista
    });
});

// Ruta para eliminar una noticia existente (requiere autenticación de administrador)
router.post("/edit-news/:id/delete", isAdmin, (req, res, next) => {
  const id  = req.params.id;

  NewsArticle.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/admin/edit-news");
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