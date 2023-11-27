const {
  createAddress,
  deleteAddress,
  getUserAddresses,
} = require('../controllers/address');
const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createAddress);
router.route('/:addressId').delete(protect, deleteAddress);
router.route('/get-user-addresses').get(protect, getUserAddresses);
module.exports = router;
