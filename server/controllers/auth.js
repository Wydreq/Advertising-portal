const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email, password, dateOfBirth, gender, role} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender,
        role
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({success: true, token});
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    //Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials!', 401));
    }

    sendTokenResponse(user,200,res);
})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({success: true, token, options, user});
}

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(()=>process.exit(1));
});
