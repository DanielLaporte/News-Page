const express = require('express');
const router = express.Router();

/* GET home page */

router.get("/", (req, res, next) => {
  res.render("index");
  let isAdmin = false;
if (req.session.currentUser.role === "admin"){
  isAdmin = true
}
console.log (req.session.currentUser)
  res.render("index", { isAdmin });
  
});



module.exports = router;
