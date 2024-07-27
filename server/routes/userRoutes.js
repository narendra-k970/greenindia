const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/change-password', userController.changePassword);
// router.post('/reset-password', userController.resetPassword);
router.put('/update-user', userController.updateUserDetails);
router.get('/vendors', userController.getAllVendors);

module.exports = router;
