const express = require('express');
const router = express.Router();
const {AddUser , Verifyuser , updateUserProfilePictures , uploadUserMedia , deleteUserProfilePicture, deleteUserAudio , getAllUserAudio,getAllUserImages}= require("../controllers/user");
const{authmiddleware} = require("../middlewares/auth");
const upload = require('../middlewares/multer');
const {getAllBlogsByAuthor , createBlog , deleteBlog } = require('../controllers/blog');


router.get('/login', Verifyuser);
router.get('/allaudio', authmiddleware,getAllUserAudio);
router.get('/allimage',authmiddleware, getAllUserImages);
router.post('/signup', AddUser);
router.patch('/profilepic',authmiddleware,upload.single('profileImage'), updateUserProfilePictures);
router.patch('/audio',authmiddleware,upload.single('audio'), uploadUserMedia);
router.post('/deletepicture',authmiddleware, deleteUserProfilePicture);
router.post('/deleteaudio',authmiddleware, deleteUserAudio);

module.exports = router;
 