const express = require('express');
const Offer = require('../models/Offer');
const {
  createOffer,
  getOffers,
  getOffer,
  uploadOfferPhoto,
  getUserOffers,
  deleteOffer,
  editOffer,
} = require('../controllers/offers');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const upload = require('../middleware/multer');
const router = express.Router();

router
  .route('/')
  .get(advancedResults(Offer), getOffers)
  .post(protect, createOffer);
router
  .route('/:id')
  .get(protect, getOffer)
  .delete(protect, deleteOffer)
  .put(protect, editOffer);

router.post('/upload/photo', upload.single('image'), uploadOfferPhoto);
router
  .route('/myOffers/all')
  .get(protect, advancedResults(Offer), getUserOffers);

module.exports = router;
