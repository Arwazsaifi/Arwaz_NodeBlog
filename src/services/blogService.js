const Blog = require("../models/Blog");
const { uploadToCloudinary } = require("../utils/cloudinary");

async function createBlog(userId, title, description, blogImageUrl) {
    try {
        const blog = new Blog({
            title,
            description,
            image: blogImageUrl || null, 
            createdBy: userId
        });

        const savedBlog = await blog.save();

        return {
            data: savedBlog,
            message: "Blog created successfully"
        };
    } catch (error) {
        throw new Error(`Error creating blog: ${error.message}`);
    }
}

async function getBlogs(page = 1, limit = 10) {
    try {
        const blogs = await Blog.find()
            .populate("createdBy", "email")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments();

        return {
            data: blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        };
    } catch (error) {
        throw new Error(`Error fetching blogs: ${error.message}`);
    }
}

async function getUserBlogs(userId, page = 1, limit = 10) {
    try {
        const blogs = await Blog.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments({ createdBy: userId });

        return {
            data: blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        };
    } catch (error) {
        throw new Error(`Error fetching user blogs: ${error.message}`);
    }
}

async function updateBlog(blogId, title, description, newImagePath) {
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Blog not found");

        let imageUrl = blog.image;

        if (newImagePath) {
            imageUrl = await uploadToCloudinary(newImagePath);
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = imageUrl;

        const updatedBlog = await blog.save();

        return {
            data: updatedBlog,
            message: "Blog updated successfully"
        };
    } catch (error) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
}

async function deleteBlog(blogId, userId) {
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Blog not found");

        if (blog.createdBy.toString() !== userId) {
            throw new Error("Unauthorized: You can only delete your own blog");
        }

        await Blog.findByIdAndDelete(blogId);

        return {
            message: "Blog deleted successfully"
        };
    } catch (error) {
        throw new Error(`Error deleting blog: ${error.message}`);
    }
}

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getUserBlogs
};
