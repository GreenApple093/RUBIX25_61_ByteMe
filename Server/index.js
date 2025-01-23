// exporting modules.
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./config/connect');
const env = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const configureGoogleStrategy = require('./config/passport-google.js');
const googleAuthRoute = require('./routes/google.js');
const cors = require('cors');
 // Adjust the path as needed
//CLUSTER ON 1 PROJECT
const app = express();
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// Configure Google Strategy
configureGoogleStrategy(passport);

// Routes




//using middlewares.

app.use(morgan('tiny'));
app.use(express.json());
app.use(googleAuthRoute);
// Serve static files (optional, in case you need it for other purposes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// connecting env
env.config();
const Url = process.env.CONNECTION_URL; 

// connecting database.
connectMongoDb();

//creating routes
app.use("/User" , userRouter);

//launching the server
app.listen(3300, () => {
  console.log('Server is running on port 3300');
});
