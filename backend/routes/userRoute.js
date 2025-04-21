const express = require('express');
const userRouter = express.Router();
const UserModel = require('../dbModels/usersSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLoginUser } = require('../middlewares/validator');
const passport = require('passport');
const authenticator = require('../middlewares/authenticator');
require('../middlewares/passportConfig');


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
            sameSite: 'None',
            // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            secure: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day,            
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

        const newUser = new UserModel({
            email,
            password: hashedPassword,            
        })
        if(!userName && email) newUser.userName = email;
        if(!userName && !email && phoneNumber) newUser.userName = phoneNumber;
        if(userName) newUser.userName = userName;
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

userRouter.get('/login/googleAuth', passport.authenticate('google',{scope: ['profile', 'email'],prompt: 'select_account'}));

userRouter.get('/login/googleAuth/callback', passport.authenticate('google', {session: false}), async (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication Failed"
            });
        }
        
        const user = req.user;

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        
        res.cookie('token', token,{
            httpOnly: true,
            sameSite: 'None',
            // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            secure: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.redirect('https://connectedapp-frontend.onrender.com/dashboard'); // Redirect to your frontend URL
        // res.redirect('http://localhost:5173//dashboard'); // Redirect to your frontend URL

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });        
    }

});

userRouter.get('/getUser', authenticator, async (req, res) => {
    try {
        const userId = req.body.userId;
        
        if(!userId) {
            console.log('coming from here');
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login first"
            });
        };

        const verifiedUser = await UserModel.findById(userId).select('userName email phoneNumber');
        
        res.status(200).json({
            success: true,
            message: 'User Verified',
            verifiedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });        
    }
})

userRouter.get('/logout', async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
})

module.exports = userRouter;
