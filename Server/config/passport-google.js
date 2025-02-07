const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.jwt;

const configureGoogleStrategy = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            callbackURL: 'http://localhost:3300/auth/google/callback',

        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const firstName = profile.name.givenName || '';
                const lastName = profile.name.familyName || '';

                // Check if the user exists
                let user = await User.findOne({ email });

                if (!user) {
                    // Create a new user if it doesn't exist
                    user = new User({
                        name: `${firstName} ${lastName}`.trim(),
                        email,
                        password: '', // Placeholder password
                    });
                    await user.save();
                }
                
                // Generate JWT token
                const token = jwt.sign({ _id: user._id, email: user.email, name : user.name }, JWT_SECRET, { expiresIn: '7d' });
                
                // Attach token to user object
                const userWithToken = {
                    ...user.toObject(),
                    token,
                };

                return done(null, userWithToken); // Pass user with token to the next middleware
            } catch (error) {
                console.error('Error during Google OAuth:', error);
                return done(error, null);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, { id: user._id, token: user.token }); // Include token
    });
    
    passport.deserializeUser(async (obj, done) => {
        try {
            const user = await User.findById(obj.id);
            if (!user) return done(null, false);
            done(null, { ...user.toObject(), token: obj.token }); // Restore token
        } catch (err) {
            done(err, null);
        }
    });
    
};

module.exports = configureGoogleStrategy;
