const mongoose = require('mongoose');

const {DB_URL} = process.env;

const connectDB = async()=> 
    await mongoose.connect(DB_URL).then(() => {
        console.log('connected to the database');
        
    }).catch((e) => {     
        console.log(e);
        process.exit(1);
    });

module.exports = connectDB;
