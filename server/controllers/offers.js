const Offer = require('../models/Offer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('cloudinary').v2;

// @desc        Get all offers
// @route       GET /api/v1/offers
// @access      Private
exports.getOffers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
// @route   POST /api/v1/offers/photoupload
// @access  Private
exports.uploadOfferPhoto = asyncHandler(async (req, res, next) => {
  cloudinary.config({
    cloud_name: `${process.env.FILEUPLOAD_CLOUD_NAME}`,
    api_key: `${process.env.FILEUPLOAD_API_KEY}`,
    api_secret: `${process.env.FILEUPLOAD_API_SECRET}`,
  });

  const image = req.body;

  cloudinary.uploader.upload(image).then((result) => {
    console.log(result);
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
