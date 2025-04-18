const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try{
        const token = req.cookies.token;
        
        if(!token) {
            console.log('comes here middleware no token');
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login first"
            });
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verifiedToken.userId;

        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token! Please login first",
            error: error.message
        });
    }
}


