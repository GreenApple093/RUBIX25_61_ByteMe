const express = require('express');
const passport = require('passport');
const googleAuthController = require('../controllers/googleauth.js');
const authmiddleware = require('../middlewares/userauth.js');
const router = express.Router();

// router.get('/googlelogin', (req, res) => {
//     res.send("<a href='/auth/google'>Login with Google</a>");
// });

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', successRedirect: 'http://localhost:3000/main' // Redirect to your frontend dashboard 
}), googleAuthController.callback);

router.get('/profile', authmiddleware.passAuthUser, googleAuthController.profile);

router.get('/google-logout', googleAuthController.logout);

module.exports = router;