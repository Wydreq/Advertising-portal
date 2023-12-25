const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the buyer'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the seller'],
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
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'delivery', 'delivered'],
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
