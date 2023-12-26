const express = require('express');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const {
  stripePayment,
  recievePayment,
  addPayment,
} = require('../controllers/payment');

router.route('/').post(protect, stripePayment);
router.route('/:sessionId').get(protect, addPayment);

module.exports = router;
