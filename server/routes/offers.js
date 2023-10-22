const express = require('express');
const Offer = require('../models/Offer');
const {
  createOffer,
  getOffers,
  getOffer,
  uploadOfferPhoto,
} = require('../controllers/offers');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();

router
  .route('/')
  .get(advancedResults(Offer), getOffers)
  .post(protect, createOffer);
router.route('/photoupload').post(protect, uploadOfferPhoto);
router.route('/:id').get(protect, getOffer);

module.exports = router;
