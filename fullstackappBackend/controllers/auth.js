const User = require('../models/User');
const asyncHandler = require('../middleware/async');

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
})

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(()=>process.exit(1));
});
