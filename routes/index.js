const express = require('express');
const router = express.Router();

const guestRoutes = require('./guest');

router.use('/guest', guestRoutes);

module.exports = router;