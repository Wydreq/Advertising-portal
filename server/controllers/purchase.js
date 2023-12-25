const Purchase = require('../models/Purchase');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

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

  userPurchasedItem.status = 'delivered';
  await userPurchasedItem.save();

  res.status(200).json({
    success: true,
    data: userPurchasedItem,
  });
});
