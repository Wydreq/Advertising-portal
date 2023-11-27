const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user'],
  },
  offer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Offer',
    required: [true, 'Please provide the offer'],
  },
  deliveryAddress: {
    type: mongoose.Schema.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide the address'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide the total price'],
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
