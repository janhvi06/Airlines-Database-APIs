const express = require('express');
const router = express.Router();

const airlineRoutes = require('../routes/airlines.route');
const passengerRoutes = require('../routes/passenger.route');

router.use("/airline/", airlineRoutes)
router.use("/passenger/", passengerRoutes)

module.exports = router;