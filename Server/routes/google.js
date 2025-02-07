const express = require('express');
const passport = require('passport');
const googleAuthController = require('../controllers/googleauth.js');
const authmiddleware = require('../middlewares/userauth.js');
const router = express.Router();

// router.get('/googlelogin', (req, res) => {
//     res.send("<a href='/auth/google'>Login with Google</a>");
// });

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', successRedirect: 'http://localhost:3000/main' // Redirect to your frontend dashboard 
// }), googleAuthController.callback);

router.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

//  FIX: Authenticate first, then pass to controller
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => {
        console.log('🔥 Called auth/google/callback, User:', req.user);
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        
        // Send user data & token to frontend
        res.redirect(`http://localhost:3000/main?token=${req.user.token}`);
    }
);



router.get('/profile', authmiddleware.passAuthUser, googleAuthController.profile);

router.get('/google-logout', googleAuthController.logout);

module.exports = router;