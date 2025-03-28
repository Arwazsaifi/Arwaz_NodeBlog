const express = require("express");
const authMiddleware = require("../middleware/auth");
const commentController = require("../controllers/commentController");
const { validateComment } = require("../validation/common");
const { validate } = require("../middleware/validation");

const router = express.Router();

router.post(
    "/", authMiddleware,
    validateComment, validate,
    commentController.addComment
);
router.get("/:blogId", commentController.getComments);

module.exports = router;
