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
            })
        }

        const newcomment = await Comment.create({
            blogId,
            userId: userId,
            comment
        });

        await newcomment.save();
        
        const existingpost = await Blog.findById(blogId);

        if(!existingpost){
            return res.status(404).json({
                message:"blog not found",
                success:false
            })
        }else{
            existingpost.comments.push(newcomment._id);
            await existingpost.save();
        }

        res.status(200).json({
            message: "added comment",
            success: true,
            newcomment
        });

    } catch (error) {
        console.error("comment error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const deletecomment = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}