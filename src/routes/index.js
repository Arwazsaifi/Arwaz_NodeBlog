const express = require("express");
const usersRoutes = require("./users");
const blogRoutes = require("./blog");
const commentRoutes = require("./comment");

const init = (app) => {
  const router = express.Router();
  app.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  app.post('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  app.put('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });
  
  router.use("/users", usersRoutes);
  router.use("/blogs", blogRoutes);
  router.use("/comments", commentRoutes);

  app.use("/v1", router);
  return router;
};

module.exports = { init };
