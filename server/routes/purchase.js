const express = require('express');
const Purchase = require('../models/Purchase');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const {
  getSoldItems,
  getPurchasedItems,
  setItemOnDelivery,
  setItemDelivered,
} = require('../controllers/purchase');

router.route('/sold').get(advancedResults(Purchase), protect, getSoldItems);
router
  .route('/purchased')
  .get(advancedResults(Purchase), protect, getPurchasedItems);

router.route('/:purchaseId/delivery').get(protect, setItemOnDelivery);
router.route('/:purchaseId/delivered').get(protect, setItemDelivered);

module.exports = router;
