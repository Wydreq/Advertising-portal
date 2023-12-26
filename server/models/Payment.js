const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, 'Please provide id'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user'],
  },
  credits: {
    type: Number,
    required: [true, 'Please provide the total credits'],
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'withdrawn'],
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
