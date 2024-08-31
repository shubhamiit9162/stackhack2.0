const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/adminController');

// Apply middleware
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/getAllUsers', getAllUsers);
router.get('/getUsers/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;
