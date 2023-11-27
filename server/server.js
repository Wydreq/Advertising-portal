const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
dotenv.config({ path: './config/config.env' });
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

connectDB();

const app = express();
app.use(express.json());

const auth = require('./routes/auth');
const offers = require('./routes/offers');
const admin = require('./routes/admin');
const address = require('./routes/address');

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.use('/api/v1/auth', auth);
app.use('/api/v1/offers', offers);
app.use('/api/v1/admin', admin);
app.use('/api/v1/address', address);

app.use(errorHandler);

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//STRIPE PAYMENT
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:4200/home`,
    cancel_url: `http://localhost:4200/home`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
