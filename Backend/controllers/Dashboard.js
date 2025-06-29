import { Blog } from '../models/blog.js';
import { User } from '../models/user.js';
import {Comment} from '../models/comments.js';
import path from 'path';
import fs from 'fs';

export const getalldata = async (req, res) => {
    try {
        const users = await User.find({});
        const posts = await Blog.find({});
        const comments = await Comment.find({});

        res.status(200).json({
            message: "all users and posts fetched",
            success: true,
            posts,
            users,
            comments
        })

    } catch (error) {
        console.error("dashboard error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getallusers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            message: "all users fetched",
            success: true,
            users
        })

    } catch (error) {
        console.error("users error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;

    //  Check ID
    if (!id) {
      return res.status(400).json({
        message: "Please provide user ID",
        success: false,
      });
    }

    //  Find User
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //  Prevent admin deletion
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admins cannot be deleted",
        success: false,
      });
    }

    //  Delete Profile Image (if exists)
    if (user.profile) {
      const imagePath = path.join("public", "images", user.profile);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
        else console.log("User image deleted");
      });
    }

    //  Get all comment IDs made by user
    const userComments = await Comment.find({ userId: id });
    const commentIds = userComments.map((comment) => comment._id);

    //  Delete user's comments
    await Comment.deleteMany({ userId: id });

    // 🧹 6. Remove comment references from blogs
    await Blog.updateMany(
      {},
      { $pull: { comments: { $in: commentIds } } }
    );

    //  Delete the user
    await User.findByIdAndDelete(id);

    //  Response
    return res.status(200).json({
      message: "User and related comments deleted successfully",
      success: true,
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

