const express = require('express');
const User = require('../models/User');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/users').get(advancedResults(User), getUsers);
router.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
