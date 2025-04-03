const express = require('express');
const userRouter = express.Router();
const UserModel = require('../dbModels/usersSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;

userRouter.post('/login',async(req,res) => {
    try { 
        const {userName, password} = req.body;
        const user = await UserModel.findOne({userName});
        
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // const isValidPassword = await bcrypt.compare(password, user.password);

        // if(!isValidPassword){
        //     res.status(401).json({
        //         success: false,
        //         message: "Invalid Password"
        //     })
        // }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',            
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            Error: error.message
        })        
    }
    
})

userRouter.post('/register', async(req, res) => {
    try {
        const {userName, phoneNumber, email, password} = req.body;

        const existingUser = await UserSchema.findOne({phoneNumber});

        if(existingUser){
            res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new UserSchema({
            userName,
            phoneNumber,
            email,
            password: hashedpassword,
            profilePic
        })
    } catch (error) {
        
    }
})

module.exports = userRouter;