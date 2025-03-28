const express = require("express");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/auth");
const upload = require('../middleware/upload');
const { validateBlogCreation, validateBlogUpdate } = require("../validation/common");
const { validate } = require("../middleware/validation");

const router = express.Router();

router.post(
    "/", authMiddleware, upload.single("image"),
    validateBlogCreation, validate,
    blogController.createBlog
);

router.get("/", blogController.getBlogs);

router.get("/my-blogs", authMiddleware, blogController.getMyBlogs);

router.put(
    "/:id", authMiddleware,upload.single("image"),
    validateBlogUpdate, validate,
    blogController.updateBlog
);

router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
