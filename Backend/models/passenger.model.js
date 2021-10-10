const mongoose = require('mongoose');

/**
 * Passengers Schema
 *  
 * @attributes
 *  id
 *  name
 *  no. of trips
 *  arline details
 */

const passengerSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Kindly provide your name"],
        trim: true,
    },
    trips: {
        type: Number,
        required: true
    },
    airline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airlines",
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Passengers', passengerSchema);