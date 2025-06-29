import { Blog } from "../models/blog.js";
import fs from "fs";
import path from "path";

export const create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file.filename

        if (!title || !description || !image) {
            return res.status(400).json({
                message: "All fileds required",
                success: false
            })
        }

        const newblog = await Blog.create({
            title,
            image,
            description
        });

        await newblog.save();

        res.status(200).json({
            message: "Blog Created",
            success: true,
            newblog
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Please provide blog ID",
                success: false
            });
        }

        // 🔍 Find and delete the blog
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        // 🧹 Delete the image from "public/images"
        const imagePath = path.join("public", "images", blog.image);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            } else {
                console.log("Image deleted successfully");
            }
        });

        // ✅ Send response
        res.status(200).json({
            message: "Post deleted successfully",
            success: true
        });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Blog.find({});

        if (!posts) {
            return res.status(404).json({
                message: "posts not found",
                success: false
            })
        }

        res.status(200).json({
            message: "fetched all posts",
            success: true,
            posts
        });

    } catch (error) {
        console.error("Posts error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const findPost = await Blog.findById(id); // ✅ fix

        if (!findPost) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        // 🧹 If new image is uploaded, delete old one
        if (req.file) {
            const oldImagePath = path.join("public", "images", findPost.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("Error deleting old image:", err);
                } else {
                    console.log("Old image deleted successfully");
                }
            });

            findPost.image = req.file.filename;
        }

        // ✍️ Update title/description only if provided
        if (title) findPost.title = title;
        if (description) findPost.description = description;

        await findPost.save();

        res.status(200).json({
            message: "Updated Successfully",
            success: true,
            post: findPost
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getblogbyid = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "please provide id",
                success: false
            });
        }

        const findblog = await Blog.findById(id).populate({
            path:"comments",
            populate:{
              path:"userId"
            } 
        });

        if (!findblog) {
            return res.status(404).json({
                message: "blog not found",
                success: false
            })
        }

        res.status(200).json({
            message: "blog fetched",
            success: true,
            findblog,
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
