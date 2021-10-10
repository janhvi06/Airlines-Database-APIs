const express = require('express');

const errorResponse = (res, statusCode, message = null, error = null) => {

    return res.status(statusCode).json({
        success: false,
        message: message || ErrorArray[statusCode],
        error: error || ""
    })
}

const successResponse = (res, statusCode, message = "", data = []) => {

    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    })
}

const defaultResponse = (res, state,statusCode, message = "", data = []) => {

    return res.status(statusCode).json({
        success: state,
        message: message,
        data: data || ""
    })
}

module.exports = {
    errorResponse,
    successResponse,
    defaultResponse
}