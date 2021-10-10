const mongoose = require('mongoose');

/**
 * Airlines Schema
 *  
 * @attributes
 *  id
 *  name
 *  country
 *  logo
 *  slogan
 *  head_quaters
 *  website
 *  established
 */

const airlineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    airlineName: {
        type: String,
        required: [true, "Kindly mention the Airline's name"],
        trim: true,
        min: 15,
        max: 40
    },
    country: {
        type: String,
        required: [true, "Kindly mention the Country name"],
        trim: true,
    },
    logo: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        trim: true,
        unique: true
    },
    head_quaters: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true,
        unique: true
    },
    established: {
        type: Number,
        length: 4,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Airlines', airlineSchema);