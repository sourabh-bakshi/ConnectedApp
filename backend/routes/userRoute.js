const express = require('express');
const userRouter = express.Router();
const UserModel = require('../dbModels/usersSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validateRegister, validateLoginUser } = require('../middlewares/validator');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const SALT_ROUNDS = 12;

userRouter.post('/login', validateLoginUser, async(req,res) => {
    try { 
        
        const {password} = req.body;        
        const user = req.user;
        
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }

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

userRouter.post('/register', validateRegister, async(req, res) => {// incomplete register route need to complete--
    try {
        const {userName, phoneNumber, email, password, profilePic} = req.validatedData;

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserSchema({
            userName,
            email,
            password: hashedPassword,            
        })
        if(phoneNumber) newUser.phoneNumber = phoneNumber;
        if(profilePic) newUser.profilePic = profilePic;

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            newUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            Error: error.message
        })
        
    }
})

// userRouter.get('/googleAuth', async(req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// })
module.exports = userRouter;