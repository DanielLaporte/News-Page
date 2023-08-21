const express = require("express");
const router = express.Router();


const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


const saltRounds = 10;

const User = require("../models/User.model");


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const adminRoutes = require("./admin.routes");


router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});


router.post("/signup", isLoggedOut, (req, res, next) => {
  let { username, email, password, passwordRepeat, role } = req.body;

  
  if (username == "" || email == "" || password == "" || passwordRepeat == "" || role == "") {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email, and password.",
    });

    return;
  }

  if (password.length < 6) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });

    return;
  }

  if (password != passwordRepeat) {
    res.render("auth/signup", {
      errorMessage: "The passwords do not match.",
    });
    return;
  }

  User.find({ username })
    .then((result) => {
      if (result.length != 0) {
        res.render("auth/signup", {
          errorMessage:
            "The user already exists, please choose another one.",
        });
        return;
      }

      
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          
          return User.create({ username, email, password: hashedPassword, role });
        })
        .then((user) => {
          res.redirect("/auth/login");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("auth/signup", { errorMessage: error.message });
          } else if (error.code === 11000) {
            res.status(500).render("auth/signup", {
              errorMessage:
                "Username and email need to be unique. Provide a valid username or email.",
            });
          } else {
            next(error);
          }
        });
    })
    .catch((error) => {
      next(error);
    });
});


router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});


router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, email, password, role } = req.body;

 
  if (username === "" || email === "" || password === "" || role === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, email and password.",
    });

    return;
  }

 
  if (password.length < 6) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  
  User.findOne({ email })
    .then((user) => {
     
      if (!user) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res
              .status(400)
              .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
          }

         
          req.session.currentUser = user.toObject();
          
          delete req.session.currentUser.password;

          res.redirect("/");
        })
        .catch((err) => next(err)); 
    })
    .catch((err) => next(err));
});


router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/"); 
  });
});


router.use("/admin", adminRoutes);



module.exports = router; 