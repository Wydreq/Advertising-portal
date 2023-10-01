const Offer = require('../models/Offer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc        Get all offers
// @route       GET /api/v1/offers
// @access      Private
exports.getOffers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


// @desc    Create offer
// @route   POST /api/v1/offers
// @access  Private
exports.createOffer = asyncHandler(async (req, res, next) => {
   req.body.user = req.user.id;
   const offer = await Offer.create(req.body);

    res.status(201).json({
        success: true,
        data: offer
    });
});
