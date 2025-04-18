const passportConfig = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../dbModels/usersSchema');
const JWT = require('jsonwebtoken');

passportConfig.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://connectedapp-production.up.railway.app/api/user/login/googleAuth/callback',
}, async(accessToken, refreshToken, profile, done) => {
    
    try {
        console.log(profile);
        let user = await UserModel.findOne( {$or:[ 
            {googleId: profile.id},
            {email: profile.emails[0].value}            
        ]
    });

        if(!user)
        {
            user = new UserModel({
                googleId: profile.id,
                userName: profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value,                
            })
            await user.save();
        }
        else
        {
            if(!user.googleId)
            {
                user.googleId = profile.id;
                await user.save();
            }
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}
));

module.exports = passportConfig;