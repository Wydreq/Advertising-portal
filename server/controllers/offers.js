const Offer = require('../models/Offer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

// @desc        Get all offers
// @route       GET /api/v1/offers
// @access      Private
exports.getOffers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get offers from a specific user
// @route   GET /api/v1/offers/myOffers/all
// @access  Private
exports.getUserOffers = asyncHandler(async (req, res, next) => {
  const userOffers = await Offer.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: userOffers,
  });
});

// @desc        Get single offer
// @route       GET /api/v1/offers/:id
// @access      Private
exports.getOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: offer,
  });
});

// @desc    Uploading photo
// @route   POST /api/v1/offers/photo/upload
// @access  Private
exports.uploadOfferPhoto = asyncHandler(async (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log('essa');
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Uploaded!',
      data: result,
    });
  });
});

// @desc    Create offer
// @route   POST /api/v1/offers
// @access  Private
exports.createOffer = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const offer = await Offer.create(req.body);

  res.status(201).json({
    success: true,
    data: offer,
  });
});

// @desc        Delete offer
// @route       DELETE /api/v1/offers/:id
// @access      Private
exports.deleteOffer = asyncHandler(async (req, res, next) => {
  let offer = await Offer.findById(req.params.id);
  //Make sure user is bootcamp owner
  if (offer.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this offer`,
        401
      )
    );
  }

  offer = await Offer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: offer,
  });
});

// @desc        Edit offer
// @route       PUT /api/v1/offers/:id
// @access      Private
exports.editOffer = asyncHandler(async (req, res, next) => {
  let offer = await Offer.findById(req.params.id);

  if (!offer) {
    return next(
      new ErrorResponse(`Offer not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is bootcamp owner
  if (offer.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to edit this offer`,
        401
      )
    );
  }

  offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: offer,
  });
});
