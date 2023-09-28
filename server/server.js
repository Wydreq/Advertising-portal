const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

dotenv.config({path: './config/config.env'});

connectDB();

const auth = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use('/api/v1/auth', auth);

app.use(errorHandler);

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
