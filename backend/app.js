//importing the required 
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); //connectecting to the env file for required variables
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');//importing the user route

app.use(cors({
    origin: '*',
    credentials: true
}));//using cors for cross origin requests

app.use(express.json());//Add middleware for body as json
app.use(cookieParser());//Add middleware for cookie parser

//route imports
app.use('/api/user', userRouter);



connectDB();//connecting to the database

//listening through env call to the declared port
app.listen(process.env.PORT,() => {
    console.log('server listening on port ,', process.env.PORT);
});