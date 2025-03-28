const commentService = require("../services/commentService");

async function addComment(req, res) {
    try {
        const { blogId, content, parentComment } = req.body;
        const userId = req.user.userId;
        const result = await commentService.addComment(
            blogId,
            userId,
            content,
            parentComment
        );

        res.status(201).send({
            status: "success",
            ...result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

async function getComments(req, res) {
    try {
        const { blogId } = req.params;
        const result = await commentService.getComments(blogId);

        res.status(200).send({
            status: "success",
            ...result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { addComment, getComments };
