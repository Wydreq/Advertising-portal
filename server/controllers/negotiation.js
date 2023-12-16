const Negotiation = require('../models/Negotiation');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Offer = require('../models/Offer');

// @desc    Create negotiation
// @route   POST /api/v1/negotiation
// @access  Private
exports.createNegotiation = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const offer = await Offer.findById(req.body.offerId);

  if (!offer) {
    return next(new ErrorResponse(`Offer not found`, 404));
  }

  if (req.body.buyerMaxPrice <= offer.negotiateMinPrice) {
    return next(
      new ErrorResponse(`Your price offer is to low for seller`, 401)
    );
  }

  if (offer.user.toString() === req.body.user) {
    return next(new ErrorResponse(`Your cant negotiate your own offer`, 401));
  }

  const preparedData = {
    offerOwner: offer.user,
    offerBuyer: req.body.user,
    offer: req.body.offerId,
    lastNegotiation: req.body.buyerMaxPrice,
  };

  const negotiation = await Negotiation.create(preparedData);

  res.status(201).json({
    success: true,
    data: negotiation,
  });
});
