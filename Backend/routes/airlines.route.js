const express = require('express');
const router = express.Router();

const {
    readAllAirlines,
    createAirline,
    readAirlineByID
} = require('../controllers/airlines.controller');

const {
    upload
} = require('../middlewares/common.middleware');

router.get("/read",readAllAirlines)
router.post("/create", upload.single('logoImage'), createAirline)
router.get("/read/:id",readAirlineByID)

module.exports = router;