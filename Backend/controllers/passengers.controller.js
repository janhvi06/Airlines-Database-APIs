const passengerModel = require('../models/passenger.model')
const airlineModel = require('../models/airlines.model')
const {
    errorResponse,
    successResponse,
} = require('../helpers/helper')

const registerData = (req,res) => {
    const {
        name,
        trips,
        airline
    } = req.body;
    airlineModel.findOne({
        id : airline
    }).exec((error, data) => {
        if(error){
            console.log(error);
            return errorResponse(res,400,"Invalid Airline ID",error)
        }
        if(data) {
            const _passenger = new passengerModel({
                name : name,
                trips: trips,
                airline: data
            });
            _passenger.save((error, passenger) => {
                if (error) {
                    console.log(error);
                    return errorResponse(res,400,"Invalid request",error)
                }
                if(passenger) {
                    return successResponse(res,200,"Passenger Registered Successfully",passenger)
                }
            })
        }
    })
}

const readDataByID = async (req, res) => {
        const {
            id
        }= req.params;
    try {
        const passenger = await passengerModel.findOne({
            _id: id
        }, '_id name trips airline').populate({
            path: "airline",
            select: "-_id id airlineName country logo slogan head_quaters website established"
        });
        return successResponse(res,200,"successful",passenger)
    } catch (error) {
        console.log(error)
        return errorResponse(res,400,"Invalid Passenger ID. No passenger has been registered with this ID",error)
    }

}

const updateNameByID = (req, res) => {
    const {
        id
    }= req.params;
    const{
        newname
    } = req.body
        passengerModel.findOne({
            _id: id
        }).exec((error, data) => {
            if(error){
                console.log(error)
                return errorResponse(res,400,"Invalid Passenger ID.  No passenger has been registered with this ID",error)
            }
            if(data){
                passengerModel.updateOne({
                    _id: id
                }, {
                $set: {
                    name: newname
                }
            }).exec((error, data) => {
                if(error){
                    console.log(error);
                    return errorResponse(res,400,"Invalid request",error)
                }
            
                if(data){
                    passengerModel.findOne({_id: id}, ' -_id name').exec((error,data) => {
                        if(error){
                            console.log(error);
            return errorResponse(res,400,"Unexpected error occurred. Please try again.",error)
                        }
                        if(data){
                            console.log(error);
            return successResponse(res,200,"Name updated successfully",data)
                        }
                    })
                }
            })                
            }
        })  
}

const discardPassenger = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const passenger = await passengerModel.deleteOne({
            "_id": id
        });
        return successResponse(res, 200, "Passenger Data Discarded Successfully", passenger)
    } catch (error) {
        console.log(error)
        return errorResponse(res,400,"Invalid Passenger ID",error)
    }
}

const updateData = (req,res) => {
    const{
        id
    } = req.params
    const {
        name,
        trips,
        airline
    } = req.body;

    passengerModel.findOne({
        _id: id
    }).exec((error, data) => {
        if(error){
            console.log(error)
                return errorResponse(res,400,"Invalid Passenger ID.",error)
        }
        if(data){
            airlineModel.findOne({
                id : airline
            }).exec((error, data) => {
                if(error){
                    console.log(error)
                return errorResponse(res,400,"Invalid Airline ID",error)
                }                
                if(data) {
                    passengerModel.updateMany({
                        _id: id
                    }, {
                        name : name,
                        trips: trips,
                        airline: data
                    }).exec((error, data) => {
                        if(error) {
                            console.log(error)
                return errorResponse(res,400,"Invalid Request",error)
                        }
                        if(data){
                            return successResponse(res,200,"Passenger Data Updated Successfully",data)
                        }
                    })
                }
            })
        }
    })    
}

const readPassengerData = (req,res) => {
    const{
        page,
        size
    }=req.query;
    passengerModel
    .find({}, '_id name trips airline')
    .populate({
            path: "airline",
            select: "id airlineName country logo slogan head_quaters website established"
        })
    .skip(size * page)
    .limit(1) //working only when hardcoded, as in <limit(size) is not wokring which should in a proper manner
    .exec(function (err, events) {
        passengerModel.count().exec((err, count) => {
                if(count){
                    return res.json({
                        data: events,
                        page: page,
                        pages: count / size,
                        total_passengers: count
                    })
                }
            })           
        })
}


module.exports =  {
    discardPassenger,
    registerData,
    readPassengerData,
    readDataByID,
    updateNameByID,
    updateData
}
