const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please insert first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please insert last name'],
  },
  email: {
    type: String,
    required: [true, 'Please insert email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please insert password'],
    minLength: 6,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'blocked'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please insert date of birth'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
  credits: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  changeEmailToken: String,
  changeEmailTokenExpire: Date,
  changeEmailAddress: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getChangeEmailToken = function (email) {
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash token and set to resetPasswordToken field
  this.changeEmailToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //Set expire
  this.changeEmailTokenExpire = Date.now() + 10 * 60 * 1000;
  this.changeEmailAddress = email;
  return resetToken;
};

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
