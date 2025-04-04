const validator = require('validator');
const userSchema = require('../dbModels/usersSchema');

const validateUser = async (req, res, next) => {
    try {
        const { userName, email, password, phoneNumber} = req.body;

        const user = await userSchema.findOne({userName, password, phoneNumber, email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        if(email && !validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        
    } catch (error) {
        
    }
}
