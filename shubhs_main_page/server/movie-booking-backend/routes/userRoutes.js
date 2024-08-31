const express = require('express');
const { registerUser, loginUser, bookMovie, getYourProfile } = require('../controllers/userController');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/book',  bookMovie);
router.get('/profile', getYourProfile);


module.exports = router;
