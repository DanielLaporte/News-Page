// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "News-Page";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const internationalRoutes = require("./routes/international-news.routes");
app.use("/articles", internationalRoutes);

const politicsRoutes = require("./routes/politics-news.routes");
app.use("/articles", politicsRoutes);

const economyRoutes = require("./routes/economy-news.routes");
app.use("/articles", economyRoutes);

const scienceRoutes = require("./routes/science-news.routes");
app.use("/articles", scienceRoutes);

const sportsRoutes = require("./routes/sports-news.routes");
app.use("/articles", sportsRoutes);

const healthRoutes = require("./routes/health-news.routes");
app.use("/articles", healthRoutes);

const fullhRoutes = require("./routes/full-news.routes");
app.use("/articles", fullhRoutes);




app.use((req, res, next) => {
    res.locals.isAdmin = req.session.currentUser && req.session.currentUser.role === "admin";
    next();
  });

  
  

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
