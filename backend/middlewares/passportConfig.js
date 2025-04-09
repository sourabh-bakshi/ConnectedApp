const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../dbModels/usersSchema');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'login/googleAuth/callback',
}, async(accessToken, refreshToken, profile, done) => {
    
    try {
        let user = await UserModel.findOne({googleId: profile.id});

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
    } catch (error) {
        
    }
}
))

