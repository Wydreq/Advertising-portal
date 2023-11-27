const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  houseNumber: {
    required: true,
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  recieverFullName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Address', AddressSchema);
