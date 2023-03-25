const ApiError = require('../exceptions/api-error');

const errorMiddleware = (error, req, res, next) => {
    if(error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, error: error.error});
    }
    return res.status(500).send("<h2>Unhandled error</h2>");
}

module.exports = errorMiddleware;