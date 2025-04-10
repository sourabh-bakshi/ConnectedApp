//importing the required 
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); //connectecting to the env file for required variables
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');//importing the user route
const passport = require('passport');
const session = require('express-session');

app.use(cors({
    origin: '*',
    credentials: true
}));//using cors for cross origin requests

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));//using session for express session

app.use(express.json());//Add middleware for body as json
app.use(cookieParser());//Add middleware for cookie parser

app.use(passport.initialize());//Add middleware for passport
app.use(passport.session());//Add middleware for passport session

//route imports
app.use('/api/user', userRouter);



connectDB();//connecting to the database

//listening through env call to the declared port

const port =  process.env.PORT || 5000;
app.listen(port ,() => {
    console.log(`server listening on port ${port}`);
});