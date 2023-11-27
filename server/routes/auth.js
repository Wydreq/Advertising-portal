const express = require('express');

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  changeEmail,
  resetEmail,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').post(resetPassword);
router.route('/change-password').post(protect, changePassword);
router.route('/change-email').post(protect, changeEmail);
router.route('/reset-email/:token').post(protect, resetEmail);
module.exports = router;
