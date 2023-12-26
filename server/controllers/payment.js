const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const Payment = require('../models/Payment');

// @desc        Stripe payment
// @route       GET /api/v1/payment
// @access      Private
exports.stripePayment = asyncHandler(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PRODUCT_KEY,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url:
      'http://localhost:4200/payment/successfull/{CHECKOUT_SESSION_ID}',
    cancel_url: `http://localhost:4200/payment/canceled`,
    automatic_tax: { enabled: true },
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});

// @desc        Recieve stripe payment
// @route       GET /api/v1/payment/:sessionId
// @access      Private
exports.addPayment = asyncHandler(async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

  console.log(session);

  const existingPayment = await Payment.findOne({ id: req.params.sessionId });
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({ error: 'No user found' });
  }

  if (existingPayment) {
    return res.status(400).json({ error: 'Payment already exists' });
  }

  const newPayment = new Payment({
    id: req.params.sessionId,
    user: req.user.id,
    credits: session.amount_total / 100,
    status: 'withdrawn',
  });

  user.credits += session.amount_total / 100;

  await newPayment.save();
  await user.save();

  res.status(200).json({
    success: true,
    url: session,
  });
});
