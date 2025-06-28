import { User } from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const imagePath = req.file.filename;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Required all fields"
            })
        }

        // checking if user is already registerd 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already registered"
            });
        }



        // Hashing Password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // registering new user
        const user = await User.create({ username, email, password: hashedPassword, profile: imagePath });
        await user.save();

        res.status(200).json({
            success: true,
            message: "registerd user",
            user
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Required all fields",
                success: false
            })
        }

        // checking if user is present in db or not 
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "user is not found",
                success: false
            })
        }

        // match both passwords 
        const isPassMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPassMatch) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        // if password matched
        const payload = {id:existingUser._id,email:existingUser.email,role:existingUser.role}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:3*24*60*60*1000
        })
        res.status(200).json({
            message:"Login successfull",
            success:true,
            user:{
                profile:existingUser.profile,
                username:existingUser.username,
                email:existingUser.email,
                role:existingUser.role
            },
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const logout = async(req,res)=>{
   try {
      res.clearCookie("token");
      return res.status(200).json({
        message:"Logout successfull",
        success:true
      })
   } catch (error) {
       console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
   }
}