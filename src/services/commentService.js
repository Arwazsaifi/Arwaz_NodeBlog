const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

async function addComment(blogId, userId, content, parentComment) {
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Blog not found");

        const comment = new Comment({
            blogId,
            userId,
            content,
            parentComment: parentComment || null,
        });

        const savedComment = await comment.save();
        return {
            data: savedComment,
            message: "Comment added successfully"
        };
    } catch (error) {
        throw new Error(`Error adding comment: ${error.message}`);
    }
}

async function getComments(blogId) {
    try {
        const comments = await Comment.find({ blogId })
            .populate('userId', 'email')
            .populate('parentComment', 'content');

        return { data: comments };
    } catch (error) {
        throw new Error(`Error fetching comments: ${error.message}`);
    }
}

module.exports = { addComment, getComments };
