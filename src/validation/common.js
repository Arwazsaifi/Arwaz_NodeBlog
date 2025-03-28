const { check } = require("express-validator");

exports.validateSignup = [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

exports.validateLogin = [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").notEmpty().withMessage("Password is required"),
];

exports.validateBlogCreation = [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
];

exports.validateBlogUpdate = [
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("description").optional().notEmpty().withMessage("Description cannot be empty"),
];

exports.validateComment = [
    check("content").notEmpty().withMessage("Reply content is required"),
    check("parentComment").optional().isMongoId().withMessage("Invalid comment ID"),
];