const express = require('express');
const router = express.Router();
const {AddUser , Verifyuser , updateUserProfilePictures , uploadUserMedia , deleteUserProfilePicture, deleteUserAudio , getAllUserAudio,getAllUserImages,createTimeCapsule,getAllTimeCapsules,treasureimageadd, deleteChestImage,getAllChestImages, getUserName}= require("../controllers/user");
const{authmiddleware} = require("../middlewares/auth");
const upload = require('../middlewares/multer');
const {getAllBlogsByAuthor , createBlog , deleteBlog } = require('../controllers/blog');


router.post('/login', Verifyuser);
router.get('/allaudio', authmiddleware,getAllUserAudio);
router.get('/allimage',authmiddleware, getAllUserImages);
router.post('/signup', AddUser);
router.patch('/profilepic',authmiddleware,upload.single('profileImage'), updateUserProfilePictures);
router.patch('/audio',authmiddleware,upload.single('audio'), uploadUserMedia);
router.post('/deletepicture',authmiddleware, deleteUserProfilePicture);
router.post('/deleteaudio',authmiddleware, deleteUserAudio);
router.post('/createcapsule',authmiddleware,upload.single('file'), createTimeCapsule);
router.get('/allcapsule',authmiddleware, getAllTimeCapsules);
router.post('/addImage',authmiddleware,upload.single('image'), treasureimageadd)
router.get('/alltreasure',authmiddleware,getAllChestImages);
router.delete('/deleteImage',authmiddleware,deleteChestImage);
router.get('/name',authmiddleware,getUserName)
module.exports = router;
