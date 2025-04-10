const mongoose = require('mongoose');

// const {DB_URL} = process.env;

// const connectDB = async()=> 
//     await mongoose.connect(DB_URL).then(() => {
//         console.log('connected to the database');
        
//     }).catch((e) => {     
//         console.log(e);
//         process.exit(1);
//     });

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to the database');
    } catch (error) {
        console.log(e);
        process.exit(1);
    }
}
module.exports = connectDB;
