const express = require("express");
const userController = require("../controllers/userController");
const { validateSignup, validateLogin } = require("../validation/common");
const { validate } = require("../middleware/validation");
const upload = require('../middleware/upload')
const router = express.Router();

router.post(
    "/signup", upload.single("profileImage"), validateSignup,validate,
    userController.signup
);

router.post("/login",validateLogin,validate, userController.login);

module.exports = router;
