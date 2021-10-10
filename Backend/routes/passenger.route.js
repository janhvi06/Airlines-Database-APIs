const express = require('express');
const router = express.Router();

const {
    discardPassenger,
    registerData,
    readPassengerData,
    readDataByID,
    updateNameByID,
    updateData
} = require('../controllers/passengers.controller');

 
router.delete("/discard/:id", discardPassenger)
router.post("/register", registerData)
router.get("/read",readPassengerData)
router.get("/read/:id", readDataByID)
router.patch("/updatename/:id", updateNameByID)
router.put("/updatedata/:id", updateData)

module.exports = router;