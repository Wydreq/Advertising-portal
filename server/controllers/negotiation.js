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

  if (offer.negotiate === false) {
    return next(new ErrorResponse(`Offer is not negotiable`, 401));
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
    bids: [
      {
        price: req.body.buyerMaxPrice,
        user: req.body.user,
      },
    ],
  };

  const negotiation = await Negotiation.create(preparedData);

  res.status(201).json({
    success: true,
    data: negotiation,
  });
});

// @desc    Get all buyer negotiations
// @route   GET /api/v1/negotiation/buyer
// @access  Private
exports.getBuyerNegotiations = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const negotiations = await Negotiation.find({ offerBuyer: req.body.user })
    .populate('offerOwner')
    .populate('offer');

  res.status(201).json({
    success: true,
    data: negotiations,
  });
});

// @desc    Get all buyer negotiations
// @route   GET /api/v1/negotiation/offerNegotiations/:offerId
// @access  Private
exports.getOfferNegotiations = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const offer = await Offer.findById(req.params.offerId);

  if (offer.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`No permission to show this offers negotiations`, 401)
    );
  }

  const negotiations = await Negotiation.find({ offer: req.params.offerId })
    .populate('offerOwner')
    .populate('offer')
    .populate('offerBuyer');

  res.status(201).json({
    success: true,
    data: negotiations,
  });
});

// @desc    Get negotiation
// @route   GET /api/v1/negotiation/:negotiationId
// @access  Private
exports.getNegotiation = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const negotiation = await Negotiation.findById(req.params.negotiationId)
    .populate('offerOwner')
    .populate('offer');

  if (
    req.body.user !== negotiation.offerOwner._id.toString() &&
    req.body.user !== negotiation.offerBuyer._id.toString()
  ) {
    return next(
      new ErrorResponse(`No permission to show this negotiation`, 401)
    );
  }
  res.status(201).json({
    success: true,
    data: negotiation,
  });
});

// @desc    Get negotiation bids
// @route   GET /api/v1/negotiation/:negotiationId/bids
// @access  Private
exports.getNegotiationBids = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const negotiation = await Negotiation.findById(req.params.negotiationId);

  if (
    req.body.user !== negotiation.offerOwner._id.toString() &&
    req.body.user !== negotiation.offerBuyer._id.toString()
  ) {
    return next(
      new ErrorResponse(`No permission to show this negotiation`, 401)
    );
  }
  res.status(201).json({
    success: true,
    data: negotiation.bids,
  });
});

// @desc    Bid offer
// @route   GET /api/v1/negotiation/:negotiationId/bid
// @access  Private
exports.bidNegotiation = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const negotiation = await Negotiation.findById(
    req.params.negotiationId
  ).populate('offer');

  if (!negotiation) {
    return res.status(404).json({ error: 'Negotiation not found' });
  }

  if (
    req.body.user !== negotiation.offerOwner._id.toString() &&
    req.body.user !== negotiation.offerBuyer._id.toString()
  ) {
    return next(
      new ErrorResponse(`No permission to bid this negotiation`, 401)
    );
  }

  if (
    req.body.user ===
    negotiation.bids[negotiation.bids.length - 1].user.toString()
  ) {
    return next(new ErrorResponse(`Your offer is already sent`, 401));
  }

  if (req.body.user === negotiation.offerOwner._id.toString()) {
    if (req.body.price <= negotiation.bids[negotiation.bids.length - 1].price) {
      return next(
        new ErrorResponse(`Your cant bid lower than current price`, 401)
      );
    }
  } else {
    if (req.body.price >= negotiation.bids[negotiation.bids.length - 1].price) {
      return next(
        new ErrorResponse(`Your cant bid higher than current price`, 401)
      );
    }
    if (req.body.price < negotiation.offer.negotiateMinPrice) {
      return next(new ErrorResponse(`Your price is too low`, 401));
    }
  }

  negotiation.bids.push({
    price: req.body.price,
    user: req.body.user,
  });

  await negotiation.save();

  res.status(201).json({
    success: true,
    data: negotiation,
  });
});
