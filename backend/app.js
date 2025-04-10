//importing the required 
const express = require('express'); //importing express
const app = express();  //creating an instance of express
const dotenv = require('dotenv'); //importing dotenv for environment variables
dotenv.config(); //connectecting to the env file for required variables
const cors = require('cors');// importing cors for cross origin requests
const connectDB = require('./config/db'); //importing the db connection file a
const cookieParser = require('cookie-parser'); //importing cookie parser for cookies
const userRouter = require('./routes/userRoute');//importing the user route
const passport = require('passport'); //importing passport for authentication



app.use(cors({
    origin: '*',
    credentials: true
}));//using cors for cross origin requests


app.use(express.json());//Add middleware for body as json
app.use(cookieParser());//Add middleware for cookie parser

app.use(passport.initialize());//Add middleware for passport

//route imports
app.use('/api/user', userRouter);
//not using express-session as it is not required for this project using jwt token and sesson instead of cookies

connectDB();//connecting to the database

//listening through env call to the declared port

const port =  process.env.PORT || 5000;
app.listen(port ,() => {
    console.log(`server listening on port ${port}`);
});