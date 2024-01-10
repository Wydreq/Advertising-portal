const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, dateOfBirth, gender, role } =
    req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    gender,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email })
    .select('+password')
    .select('+fistName')
    .select('+lastName')
    .select('+status');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (user.status === 'blocked') {
    return next(new ErrorResponse('Account is blocked', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc        Get current logged in user
// @route       GET /api/v1/auth/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc        Change user email (email request)
// @route       POST /api/v1/auth/change-email
// @access      Private
exports.changeEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const resetToken = user.getChangeEmailToken(req.body.email);
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:4200/reset-email/${resetToken}`;

  const message = `Change email link \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Change email',
      message,
    });
    res.status(200).json({ success: true, data: 'Email send' });
  } catch (err) {
    console.log(err);
    user.changeEmailToken = undefined;
    user.changeEmailTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be send', 500));
  }
});

// @desc        Reset user email
// @route       POST /api/v1/auth/reset-email/:token
// @access      Private
exports.resetEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    changeEmailToken: req.params.token,
    changeEmailTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  //Set new passwprd
  user.email = user.changeEmailAddress;
  user.changeEmailToken = undefined;
  user.changeEmailTokenExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc        Forgot password
// @route       POST /api/v1/auth/forgotpassword
// @access      Private
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `http://localhost:4200/auth/resetpassword/${resetToken}`;

  const message = `Reset password link \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });
    res.status(200).json({ success: true, data: 'Email send' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be send', 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc        Change password
// @route       POSY /api/v1/auth/change-password
// @access      Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, password, confirmPassword } = req.body;
  const user = await User.findById(req.user.id);
  console.log(user);
  if (password !== confirmPassword) {
    return next(new ErrorResponse('Passwords are not the same!', 400));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  user.password = req.body.password;

  await user.save();

  sendTokenResponse(user, 200, res);
});
// @desc        Reset password
// @route       PUT /api/v1/auth/resetpassword/:resettoken
// @access      Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorResponse('Passwords are not the same!', 400));
  }

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token, options, user });
};

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
