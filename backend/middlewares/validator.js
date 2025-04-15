const validator = require('validator');
const UserModel = require('../dbModels/usersSchema');

const validateRegister = async (req, res, next) => {
    try {
        const { userName, email, password, phoneNumber, profilePic} = req.body;

        if(!userName){
            return res.status(400).json({
                success: false,
                message: "UserName is Required"
            })
        }

        if(!email && !phoneNumber){
            return res.status(400).json({
                success: false,
                message: "Email or Phone Number is Required"
            })
        }

        if(email && !password)
        {
            return res.status(400).json({
                success: false,
                message: "Password is Required"
            });
        }

        if(email && !validator.isEmail(email) ){
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }
        if(password && !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })){
            return res.status(400).json({
                success: false,
                message: "Password must be strong"
            })
        }
        if(phoneNumber && !validator.isMobilePhone(phoneNumber, 'any', {strictMode: false})){
            return res.status(400).json({
                success: false,
                message: "Invalid Phone Number"
            })
        }

        const query = [];

        if(userName)query.push({userName});
        if(email)query.push({email});
        if(phoneNumber)query.push({phoneNumber});

        if(query.length > 0){
            const user = await UserModel.findOne({$or: query});
            
            if(user){
                let message = "User already exists";

                if(user.userName === userName)message = "Username already exists";
                else if(user.phoneNumber === phoneNumber)message = "Phone Number already exists";
                else if(user.email === email)message = "Email already exists";

                return res.status(400).json({
                    success: false,
                    message: message
                });
            }
        }

        req.validatedData = {userName, email, password};
        if(phoneNumber)req.validatedData.phoneNumber = phoneNumber;
        if(profilePic)req.validatedData.profilePic = profilePic;

        next();
                
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        
    }
}

const validateLoginUser = async (req, res, next) => {
    try {
        const {identifier, password} = req.body;
        console.log(req.body.identifier, req.body.password, 'identifier and password');
        

        if(!identifier){
            return res.status(400).json({
                success: false,
                message: "UserName or Email is Required"
            })
        }
        if(!password)
        {
            console.log('comes here');
            return res.status(400).json({
                success: false,
                message: "Password is Required"
            });
        }

        const query = validator.isEmail(identifier) ? {email: identifier} : {userName: identifier};

        const user = await UserModel.findOne(query);
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }
        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    validateRegister, validateLoginUser
}