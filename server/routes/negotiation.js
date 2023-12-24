const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

const {
  createNegotiation,
  getBuyerNegotiations,
  getOfferNegotiations,
  getNegotiation,
  bidNegotiation,
  getNegotiationBids,
} = require('../controllers/negotiation');

router.route('/').post(protect, createNegotiation);
router.route('/buyer').get(protect, getBuyerNegotiations);
router.route('/:negotiationId').get(protect, getNegotiation);
router.route('/:negotiationId/bid').post(protect, bidNegotiation);
router.route('/:negotiationId/bids').get(protect, getNegotiationBids);
router.route('/offerNegotiations/:offerId').get(protect, getOfferNegotiations);

module.exports = router;
