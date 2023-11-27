const Address = require('../models/Address');
const asyncHandler = require('../middleware/async');
const Addresses = require('../models/Address');

// @desc    Create new address
// @route   POST /api/v1/address
// @access  Private
exports.createAddress = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const offer = await Addresses.create(req.body);

  res.status(201).json({
    success: true,
    data: offer,
  });
});

// @desc        Get all specific user addresses
// @route       GET /api/v1/get-user-addresses
// @access      Private
exports.getUserAddresses = asyncHandler(async (req, res, next) => {
  const userAddresses = await Address.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: userAddresses,
  });
});

// @desc        Delete address
// @route       DELETE /api/v1/address/:id
// @access      Private
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied!' });
    }
    await address.deleteOne();
    res.json({ message: 'Address deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unknown error' });
  }
});
