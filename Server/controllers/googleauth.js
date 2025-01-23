const logout = (req, res) => {
    req.logout((e) => {
        if (e) {
            console.log('Error logging out');
        } else {
            req.session.destroy(() => {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                res.clearCookie('connect.sid');
                res.redirect('/');
            });
        }
    });
};

/*const callback = (req, res) => {
    console.log('Called auth/google/callback');
    const token = req.user.token; // Extract the JWT token
    res.cookie('accessToken', token, { httpOnly: true, secure: false }); // Store in a cookie
    res.redirect('/profile');
};*/
const callback = (req, res) => {
    console.log('Called auth/google/callback');
    
    const token = req.user.token;
    res.status(200).json({
        message: 'Authentication successful',
        token, // Send the token in the response
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        },
    });
};


const profile = (req, res) => {
    console.log('Accessed profile');
    res.send(`Welcome ${req.user.name}`);
};

module.exports = { logout, callback, profile };
