module.exports = (req, res, next) => {
    if (req.session.currentUser.isAdmin) {
      return res.redirect("/admin/publish-news");
  }

  next();
}; 
  

