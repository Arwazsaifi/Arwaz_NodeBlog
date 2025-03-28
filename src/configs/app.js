const express = require("express");
const cors = require("cors");
const connectDB = require("../database/connection");
const routes = require("../routes"); 

let app = express();

const initializer = () => {
  const create = (config) => {
    app.use(cors());
    app.options("*", cors());
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(routes.init(app));

    app.all("/", (req, res) => {
      res.send("OK");
    });
  };

  connectDB();

  const start = () => {
    let hostname = app.get("hostname");
    let port = app.get("port");

    app.listen(port, () => {
      console.log(`Server is up and running on http://${hostname}:${port}`);
    });
  };

  return { create, start };
};

module.exports = { initializer, app };
