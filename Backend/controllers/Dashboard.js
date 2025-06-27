import { Blog } from '../models/blog.js';
import { User } from '../models/user.js';
import path from 'path';
import fs from 'fs';

export const getalldata = async (req, res) => {
    try {
        const users = await User.find({});
        const posts = await Blog.find({});

        res.status(200).json({
            message: "all users and posts fetched",
            success: true,
            posts,
            users
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
            success: true
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
    console.log(id);
    

    // 🔎 Check if ID is provided
    if (!id) {
      return res.status(400).json({
        message: "Please provide user ID",
        success: false
      });
    }

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }
   
    if(user.profile){
          const imagePath = path.join("public", "images", user.profile);
    
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Image deleted successfully");
                }
            });
    } 

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admins cannot be deleted",
        success: false
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
      success: true
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
