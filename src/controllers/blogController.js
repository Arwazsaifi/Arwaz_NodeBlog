const blogService = require("../services/blogService");
const { uploadToCloudinary } = require("../utils/cloudinary");

async function createBlog(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;
        const imagePath = req.file ? req.file.path : null; 

        const blogData = await blogService.createBlog(userId, title, description, imagePath);

        res.status(201).json({
            status: "success",
            ...blogData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

async function getBlogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 

        const blogs = await blogService.getBlogs(page, limit);
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

async function getMyBlogs(req, res) {
    try {
        const userId = req.user.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const blogs = await blogService.getUserBlogs(userId, page, limit);
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

async function updateBlog(req, res) {
    try {
        const { title, description } = req.body;
        const blogId = req.params.id;
        let imageUrl = null;

        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path);
        }

        const updatedBlog = await blogService.updateBlog(blogId, title, description, imageUrl);

        res.status(200).send({
            status: "success",
            message: "Blog updated successfully",
            updatedBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

async function deleteBlog(req, res) {
    try {
        const blogId = req.params.id;
        const userId = req.user.userId; 

        await blogService.deleteBlog(blogId, userId);

        res.status(200).send({
            status: "success",
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(403).json({ 
            error: error.message
        });
    }
}

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getMyBlogs,
};
