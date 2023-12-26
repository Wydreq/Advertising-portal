const Purchase = require('../models/Purchase');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Negotiation = require('../models/Negotiation');
const Offer = require('../models/Offer');

// @desc        Purchase item
// @route       GET /api/v1/purchases/:offerId/buy
// @access      Private
exports.purchaseItem = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const user = await User.findById(req.body.user);
  const offer = await Offer.findById(req.params.offerId);

  if (!offer) {
    return next(new ErrorResponse(`No offer found!`, 401));
  }

  if (offer.user.toString() === req.body.user) {
    return next(new ErrorResponse(`Your cant buy your own offer`, 401));
  }

  if (req.body.user === offer.user.toString()) {
    return next(new ErrorResponse(`You cant buy your own offer`, 401));
  }

  if (user.credits < offer.price) {
    return next(new ErrorResponse(`Not enought money in your wallet`, 400));
  }

  if (offer.status === 'finished') {
    return next(new ErrorResponse(`Offer is already finished!`, 400));
  }

  const newPurchase = new Purchase({
    buyer: req.body.user,
    seller: offer.user,
    offer: offer._id,
    deliveryAddress: req.body.deliveryAddress,
    totalPrice: offer.price,
  });

  offer.status = 'finished';

  await Negotiation.updateMany(
    { offer: offer._id },
    { $set: { status: 'finished' } }
  );

  user.credits = user.credits - offer.price;

  await newPurchase.save();
  await offer.save();
  await user.save();

  res.status(200).json({
    success: true,
    data: offer,
  });
});

// @desc        Get all sold items
// @route       GET /api/v1/purchases/sold
// @access      Private
exports.getSoldItems = asyncHandler(async (req, res, next) => {
  const userSoldItems = await Purchase.find({ seller: req.user.id })
    .populate('offer')
    .populate('deliveryAddress');
  res.status(200).json({
    success: true,
    data: userSoldItems,
  });
});

// @desc        Get all purchased items
// @route       GET /api/v1/purchases/purchased
// @access      Private
exports.getPurchasedItems = asyncHandler(async (req, res, next) => {
  const userPurchasedItems = await Purchase.find({
    buyer: req.user.id,
  })
    .populate('offer')
    .populate('deliveryAddress');
  res.status(200).json({
    success: true,
    data: userPurchasedItems,
  });
});

// @desc        Setting item on delivery
// @route       GET /api/v1/purchases/:purchaseId/delivery
// @access      Private
exports.setItemOnDelivery = asyncHandler(async (req, res, next) => {
  const userSoldItem = await Purchase.findById(req.params.purchaseId);

  if (req.user.id !== userSoldItem.seller.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to use this path`,
        401
      )
    );
  }

  userSoldItem.status = 'delivery';
  await userSoldItem.save();

  res.status(200).json({
    success: true,
    data: userSoldItem,
  });
});

// @desc        Setting item delivered
// @route       GET /api/v1/purchases/:purchaseId/delivered
// @access      Private
exports.setItemDelivered = asyncHandler(async (req, res, next) => {
  const userPurchasedItem = await Purchase.findById(req.params.purchaseId);
  if (req.user.id !== userPurchasedItem.buyer.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to use this path`,
        401
      )
    );
  }

  if (userPurchasedItem.status !== 'delivery') {
    return next(new ErrorResponse(`Item is not on delivery`, 401));
  }

  const offerOwner = await User.findById(userPurchasedItem.seller);

  offerOwner.credits = offerOwner.credits + userPurchasedItem.totalPrice;

  userPurchasedItem.status = 'delivered';
  await userPurchasedItem.save();
  await offerOwner.save();

  res.status(200).json({
    success: true,
    data: userPurchasedItem,
  });
});
