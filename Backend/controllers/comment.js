import { Blog } from "../models/blog.js";
import { Comment } from "../models/comments.js";


export const create = async (req, res) => {
    try {
        const { blogId, comment } = req.body;
        const userId = req.user.id;

        if (!blogId || !comment) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Step 1: Check if blog exists first
        const existingPost = await Blog.findById(blogId);
        if (!existingPost) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        // Step 2: Create comment
        const newComment = await Comment.create({
            blogId,
            userId,
            comment: comment.trim()
        });


        // Step 3: Add comment reference to blog
        existingPost.comments.push(newComment._id);
        await existingPost.save();

        res.status(200).json({
            message: "Comment added successfully",
            success: true,
            comment: newComment
        });

    } catch (error) {
        console.error("Comment creation error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


export const deletecomment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "required id",
                success: false
            })
        }

        const commentExists = await Comment.findById(id);

        if(!commentExists){
            return res.status(404).json({
              success:false,
              message:"comment not found"
            })
        }

        await Comment.findByIdAndDelete({_id:commentExists._id});

        res.status(200).json({
            message:"comment deleted successfully"
        })

    } catch (error) {
        console.error("Comment deletion error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}