const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {  
    type: String,
    required: true, 
    unique: true 
  },
  password: { 
    type: String
    
  },
  profileImages: { // Array to store multiple Cloudinary URLs
    type: [String], // Array of strings
    default: [] // Default value is an empty array
  },  
  name: {
    type: String,
    default: null
  },
  audioFiles: { // Array to store audio URLs
    type: [String], 
    default: [] 
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
