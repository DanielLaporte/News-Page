const express = require("express");
const router = express.Router();
const NewsArticle = require("../models/NewsArticle.model");
const Comment = require("../models/Comment.model");
const isAdmin = require("../middleware/isAdmin");
const multer = require('multer');


router.get("/publish-news", isAdmin, (req, res) => {
    res.render("admin/publish-news");
  });
  

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


router.get("/edit-news", isAdmin, (req, res, next) => {
  NewsArticle.find()
    .populate('author') 
    .exec((err, newsArticles) => {
      if (err) {
        return next(err);
      }
      
      res.render("admin/edit-news", { newsArticles }); // 
    });
});

router.post("/edit-news/:id/update", isAdmin, (req, res, next) => {
  const { id } = req.params;
  const { title, content, section, author } = req.body;

  NewsArticle.findByIdAndUpdate(id, { title, content, section, author }, { new: true })
    .populate('author') 
    .exec((err, updatedNewsArticle) => {
      if (err) {
        return next(err);
      }
      
      res.render("admin/edit-news", { newsArticle: updatedNewsArticle }); 
    });
});


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


module.exports = router;