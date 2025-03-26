//importing the required 
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); //connectecting to the env file for required variables
const cors = require('cors');
const connectDB = require('./config/db');


app.use(cors());//using cors for cross origin requests
app.use(express.json());//Add middleware for body as json

//route imports



connectDB();//connecting to the database

//listening through env call to the declared port
app.listen(process.env.PORT,() => {
    console.log('server listening on port ,', process.env.PORT);
});