const ApiError = require('../exceptions/api-error')
const tokenService = require("../service/token-service");

module.exports = function(req, res, next)  {
    try {
        const accToken = req.headers.authorization.split(' ')[1];

        const userData = tokenService.verifyAccessToken(accToken);

        console.log(accToken)
        console.log(userData)

        if(!userData) next(ApiError.UnauthorizedError());

        req.user = userData;

        next();
    } catch(e) {
        next(ApiError.UnauthorizedError());
    }
}