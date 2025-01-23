const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const {sendmail} = require("../utils/nodemailer")
const cloudinary = require("../utils/cloudnary");
const fs = require('fs');
const path = require('path')
const TimeCapsule = require('../models/timeCapsule');
const { log } = require("console");
const mongoose = require('mongoose');
const Treasure = require('../models/treasureChest');

env.config();
const Salt = process.env.Salt; 
const JWT_SECRET = process.env.jwt;

async function AddUser(req, res) {
  const { email, password } = req.body;

    try {
      
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists. Please login.');
        }

        // Directly hash the password with salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        user = new User({
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // After signup, redirect to the login page
        sendmail(email);
        res.status(201).send('User registered successfully. Please login.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

async function Verifyuser(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    console.log("backend email :",email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create a JWT token with the user's email and user ID
    const token = jwt.sign(
      { email: user.email,
        _id: user._id ,
        profileImageUrl: user.profileImageUrl,
        name: user.name,
        
      }, // Payload with email and user ID for security
      JWT_SECRET,                          // Secret key from environment variables
      { expiresIn: '1000h' }              // Token expiration time
    );

    // Send the token back to the client
    return res.status(200).json({
      message: 'Login successful!',
      token: token
    });

  } catch (error) {
    console.error('Error in HandleVerify:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Handle profile image upload/update
async function updateUserProfilePictures(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Create a unique folder for the user in Cloudinary using their email
    const sanitizedEmail = userEmail.replace(/[@.]/g, '_'); // Replace "@" and "." with "_"
    const folderName = `users/${sanitizedEmail}`;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderName, // Store in the user's unique folder
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Save the new image URL to the user's `profileImages` array in the database
    user.profileImages.push(result.secure_url);
    await user.save();

    res.status(200).json({
      message: 'Profile image added successfully.',
      imageUrl: result.secure_url,
      allImages: user.profileImages, // Return all saved image URLs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function deleteUserProfilePicture(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT
  const { imageUrl } = req.body; // The URL of the image to be deleted

  try {
    // Validate that the image URL is provided
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the image exists in the user's `profileImages` array
    const imageIndex = user.profileImages.indexOf(imageUrl);
    if (imageIndex === -1) {
      return res.status(400).json({ message: 'Image URL not associated with this user.' });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = imageUrl.split('/').pop().split('.')[0]; // Get the public ID from the URL

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`users/${publicId}`, (error, result) => {
      if (error) {
        throw new Error(`Cloudinary deletion error: ${error.message}`);
      }
    });

    // Remove the image URL from the user's `profileImages` array
    user.profileImages.splice(imageIndex, 1);
    await user.save();

    res.status(200).json({
      message: 'Profile image deleted successfully.',
      allImages: user.profileImages, // Return all remaining image URLs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


//// get all pictures

async function getAllUserImages(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Retrieve all images from the `profileImages` array
    const images = user.profileImages;

    res.status(200).json({
      message: 'All user images retrieved successfully.',
      images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


// audio
async function uploadUserMedia(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Create a unique folder for the user in Cloudinary using their email
    const sanitizedEmail = userEmail.replace(/[@.]/g, '_'); // Replace "@" and "." with "_"
    const folderName = `users/${sanitizedEmail}`;

    // Determine the file type (image or audio)
    const fileType = req.file.mimetype.startsWith('audio') ? 'audio' : 'image';

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderName, // Store in the user's unique folder
      resource_type: fileType === 'audio' ? 'video' : 'image', // Use 'video' for audio uploads
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Update the user's database record
    if (fileType === 'image') {
      user.profileImages.push(result.secure_url); // Add to profileImages array
    } else if (fileType === 'audio') {
      user.audioFiles.push(result.secure_url); // Add to audioFiles array
    }
    await user.save();

    res.status(200).json({
      message: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully.`,
      fileUrl: result.secure_url,
      allImages: user.profileImages,
      allAudio: user.audioFiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


async function deleteUserAudio(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT
  const { audioUrl } = req.body; // The URL of the audio to be deleted

  try {
    // Validate that the audio URL is provided
    if (!audioUrl) {
      return res.status(400).json({ message: 'Audio URL is required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the audio exists in the user's `audioFiles` array
    const audioIndex = user.audioFiles.indexOf(audioUrl);
    if (audioIndex === -1) {
      return res.status(400).json({ message: 'Audio URL not associated with this user.' });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = audioUrl.split('/').pop().split('.')[0]; // Get the public ID from the URL

    // Delete the audio file from Cloudinary
    await cloudinary.uploader.destroy(`users/${publicId}`, { resource_type: 'video' }, (error, result) => {
      if (error) {
        throw new Error(`Cloudinary deletion error: ${error.message}`);
      }
    });

    // Remove the audio URL from the user's `audioFiles` array
    user.audioFiles.splice(audioIndex, 1);
    await user.save();

    res.status(200).json({
      message: 'Audio file deleted successfully.',
      allAudioFiles: user.audioFiles, // Return all remaining audio URLs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// get all audio

async function getAllUserAudio(req, res) {
  const userEmail = req.user.email; // Use email from the decoded JWT

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Retrieve all audio files from the `audioFiles` array
    const audioFiles = user.audioFiles;

    res.status(200).json({
      message: 'All user audio files retrieved successfully.',
      audioFiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const createTimeCapsule = async (req, res) => {
  const userId = req.user._id; // Extract user ID from decoded JWT
  const { thoughts, unveilDate } = req.body; // Extract thoughts and unveil date from form-data
  // console.log(req.body);
  
  try {
    // Validate required fields
    if (!thoughts || !unveilDate) {
      return res.status(400).json({ message: 'Thoughts and unveil date are required.' });
    }
    
    
    // Parse and validate the unveil date
    const parsedDate = new Date(unveilDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: 'Invalid unveil date format.' });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Determine file type (image or audio)
    const fileType = req.file.mimetype.startsWith('audio') ? 'audio' : 'image';

    // Create a unique folder for the user in Cloudinary using their user ID
    const folderName = `time-capsules/${userId}`;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderName, // Store in the user's unique folder
      resource_type: fileType === 'audio' ? 'video' : 'image', // Use 'video' for audio uploads
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Create a new Time Capsule in the database
    const timeCapsule = new TimeCapsule({
      user: userId,
      thoughts,
      media: [result.secure_url], // Store uploaded file URL
      unveilDate: parsedDate,
    });

    await timeCapsule.save();

    // Return the created time capsule
    res.status(201).json({
      message: 'Time Capsule created successfully.',
      timeCapsule,
    });
  } catch (error) {
    console.error('Error creating time capsule:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllTimeCapsules = async (req, res) => {
  const userId = (req.user._id); // Extract user ID from JWT
  console.log('User ID from JWT:', userId);

  try {
    // Convert userId to ObjectId if it's not already an ObjectId
    // const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log('Converted user ID to ObjectId:', userId);
    console.log(TimeCapsule.findById(userId));
    
    // Find all Time Capsules for the user
    const timeCapsules = await TimeCapsule.find({ user: req.user._id });
    console.log('Time Capsules:', timeCapsules);

    if (timeCapsules.length === 0) {
      return res.status(404).json({ message: 'No Time Capsules found.' });
    }

    res.status(200).json({
      message: 'Time Capsules retrieved successfully.',
      timeCapsules,
    });
  } catch (error) {
    console.error('Error fetching time capsules:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const treasureimageadd = async (req, res) => {
  const userId = req.user._id; // Extract user ID from decoded JWT
  const {title , tag } = req.body; // Extract thoughts and unveil date from form-data
  // console.log(req.body);
  
  try {
    // Validate required fields
    if (!title || !tag) {
      return res.status(400).json({ message: 'Title and tag are required.' });
    }
    
  
  
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Determine file type (image or audio)
    const fileType = req.file.mimetype.startsWith('audio') ? 'audio' : 'image';

    // Create a unique folder for the user in Cloudinary using their user ID
    const folderName = `chest_items/${userId}`;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderName, // Store in the user's unique folder
      resource_type: fileType === 'audio' ? 'video' : 'image', // Use 'video' for audio uploads
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Create a new Time Capsule in the database
    const TreasureChest = new Treasure({
      user: userId,
      title,
      tag,
      media: [result.secure_url], // Store uploaded file URL
      
    });

    await TreasureChest.save();

    // Return the created time capsule
    res.status(201).json({
      message: ' created successfully.',
      TreasureChest,
    });
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllChestImages = async (req, res) => {
  const userId = (req.user._id); // Extract user ID from JWT
  console.log('User ID from JWT:', userId);

  try {
    // Convert userId to ObjectId if it's not already an ObjectId
    // const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log('Converted user ID to ObjectId:', userId);
    console.log(Treasure.findById(userId));
    
    // Find all Time Capsules for the user
    const treasureimages = await Treasure.find({ user: req.user._id });
    console.log('treasure images:', treasureimages);

    if (treasureimages.length === 0) {
      return res.status(404).json({ message: 'Noimages found.' });
    }

    res.status(200).json({
      message: 'images retrieved successfully.',
      treasureimages,
    });
  } catch (error) {
    console.error('Error images loading:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { AddUser , Verifyuser , updateUserProfilePictures , uploadUserMedia , deleteUserProfilePicture, deleteUserAudio,getAllUserAudio,getAllUserImages,createTimeCapsule,getAllTimeCapsules,treasureimageadd,getAllChestImages};
