const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

const { createNegotiation } = require('../controllers/negotiation');

router.route('/').post(protect, createNegotiation);

module.exports = router;
