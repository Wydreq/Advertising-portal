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
  lastNegotiation: {
    type: Number,
    required: [true, 'Please provide the offer'],
  },
});

const Negotiation = mongoose.model('Negotiation', NegotiationSchema);

module.exports = Negotiation;
