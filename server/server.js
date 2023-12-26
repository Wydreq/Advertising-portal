const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const auth = require('./routes/auth');
const offers = require('./routes/offers');
const admin = require('./routes/admin');
const address = require('./routes/address');
const negotiation = require('./routes/negotiation');
const purchases = require('./routes/purchase');
const payment = require('./routes/payment');

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1/auth', auth);
app.use('/api/v1/offers', offers);
app.use('/api/v1/admin', admin);
app.use('/api/v1/address', address);
app.use('/api/v1/negotiation', negotiation);
app.use('/api/v1/purchases', purchases);
app.use('/api/v1/payment', payment);

app.use(errorHandler);

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
