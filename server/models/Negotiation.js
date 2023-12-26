const mongoose = require('mongoose');

const NegotiationSchema = mongoose.Schema({
  offerOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the owner'],
  },
  offerBuyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the buyer'],
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
  status: {
    type: String,
    required: true,
    default: 'active',
    enum: ['active', 'finished'],
  },
  buyerMaxPrice: {
    type: Number,
    required: true,
  },
  bids: [
    {
      price: {
        type: Number,
        required: [true, 'Please provide the price'],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provice user'],
      },
    },
  ],
});

const Negotiation = mongoose.model('Negotiation', NegotiationSchema);

module.exports = Negotiation;
