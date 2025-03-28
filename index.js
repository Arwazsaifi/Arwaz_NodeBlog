require("dotenv").config();
const { initializer, app } = require("./src/configs/app");
const config = require("./src/configs/config");
const application = initializer();

application.create(config);

application.start();

module.exports = app ;


