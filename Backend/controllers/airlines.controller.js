const airlineModel = require('../models/airlines.model');
const {
    errorResponse,
    successResponse,
    defaultResponse
} = require('../helpers/helper')

const createAirline = (req,res) => {
const {
   id,
   airlineName,
   country,
   slogan,
   head_quaters,
   website,
   established
} = req.body;

    airlineModel.findOne({ 
        id: id
    }).exec((error, data) => {
        if(error){
            console.log(error);
            return errorResponse(res,500,"Unexpected Error Occurred. Contact the adminitrator.",error)
        }
        if(data) {
            return defaultResponse(res,false,400,"Airline already exists with this ID",data)
        }

        const _airline = new airlineModel({
            id,
            airlineName,
            country,
            "logo": req.file.path,
            slogan,
            head_quaters,
            website,
            established
        });
        _airline.save((error, airline) => {
            if (error) {
                console.log(error);
                return errorResponse(res,400,"Invalid Request.",error)
            }
            if(airline) {
                return successResponse(res,200,"Airline created successfully",airline)
            }
        })
    })
}

const readAllAirlines = (req, res) => {
    airlineModel.find({}).exec((error, data) => {
        if(error)
        {
            console.log(error);
            return errorResponse(res,500,"Unexpected Error Occurred. Contact the adminitrator.",error)
        }
        if(data) {
            return successResponse(res,200,"Airlines Data.",data)
        }
        })
}

const readAirlineByID = (req, res) => {
    const {
        id
    } = req.params;
    airlineModel.findOne({
        id: id
    }).exec((error, data) => {
        if(error) {
            console.log(error);
            return errorResponse(res,400,"Invalid Request.",error)
        }
        if(data) {
            return successResponse(res,200,"Data fetched successfully",data)
        }   
    })
}

module.exports = {
    readAllAirlines,
    createAirline,
    readAirlineByID
}